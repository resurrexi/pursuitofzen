---
title: 'Implementing private fields in Django Rest Framework'
date: '2021-04-30'
tags: ['django', 'drf']
---

Django Rest Framework has a pretty robust Permissions API for granting access to resources. However, during development of a role-based application, the need to allow partial access on an instance arose. In other words, the requirement to have certain fields hidden or exposed on an instance arose.

A use case for this requirement is exposure of HIPAA information on an enterprise health management application. Users with a role of **Nurse** would have permission to see a patient's health information (e.g. medical records, biometric data) since it would help the nurses make tailored health advice to the patient, whereas users with a role of **Billing Agent** should not have access to the HIPAA information since such information has no value in generating invoices. A more general and relatable example would be a platform that wants to protect its users' private information (e.g. address, contact info) from the eyes of other users, and only allow some of these other users to have access to the information if they fulfill a role that requires such access.

Now one thing clearly missing in these use cases is the question of users making requests to themselves. In other words, if a user wanted to look at their own private information, or at data that they own, what is the decision? In this case, users who make data requests to their own information, or to instances that they own (e.g. blog posts), will have access to their private fields.

To express these requirements in simple terms, we want:

1. The ability to access private fields if user has permission to see them (role-based permission).
2. To allow users to access private information on themselves or on instances that they own if they are the ones making the request (no role-based permission, automatic right to access due to ownership).

[drf-confidential](https://github.com/resurrexi/drf-confidential) is a DRF package that addresses these requirements. Implementing this package into the existing code is not too difficult and we will look at the steps for achieving confidentiality next.

## Step 1 - modify model

Suppose our application manages employees and the data collected would be their names, address, and phone number. If we want to make the address and phone number fields private, add a `view_sensitive_employee` permission to the model's Meta class.

```python
class Employee(models.Model):
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    address_1 = models.CharField(max_length=256)
    address_2 = models.CharField(max_length=256, blank=True)
    country = models.CharField(max_length=64)
    city = models.CharField(max_length=64)
    phone_number = models.CharField(max_length=16)

    class Meta:
        permissions = (
            ("view_sensitive_employee", "Can view sensitive employee info"),
        )
```

This custom permission can then be added to a user's permission list or a group for defining roles.

**Note:** The permission name can be customized to follow a specific convention that can be defined with the settings variable `CONFIDENTIAL_PERMISSION_TEMPLATE`. This variable is a template string that requires a `model_name` placeholder. For example, if you want to use `confidential_employee` as the confidential permission for the employee model, then set the settings variable to `CONFIDENTIAL_PERMISSION_TEMPLATE = "confidential_{model_name}"`. The package will automatically fill in the appropriate model name when resolving the string. By default, this variable is set to `view_sensitive_{model_name}`.

## Step 2 - modify serializer

### 2a. Add `ConfidentialFieldsMixin` to class inheritance

The package comes with a `ConfidentialFieldsMixin` mixin that needs to be added to the model serializer. Going back to our Employee example, we would define an `EmployeeSerializer` that inherits from `ModelSerializer` and `ConfidentialFieldsMixin`.

```python
from drf_confidential.mixins import ConfidentialFieldsMixin

class EmployeeSerializer(ConfidentialFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = "__all__"
```

It's important to place the mixin before the serializer in the class arguments because the mixin defines a `to_respresentation` method where it first calls the inherited class's `to_representation` method, which in this case is `serializers.ModelSerializer`. If there are other mixins in the inheritance chain, be sure to place the mixin before all the others due to how methods are resolved with Python's MRO, e.g. `class MySerializer(ConfidentialFieldsMixin, OtherMixin1, OtherMixin2, ...)`.

```python
class ConfidentialFieldsMixin:
    ...

    def to_representation(self, instance):
        # call the superclass's method first
        ret = super().to_representation(instance)

        ...  # subsequent code to modify `ret`
```

### 2b. Define `confidential_fields` in serializer's Meta class

`confidential_fields` is the list of fields that are considered private. The address and phone number fields would go here. This attribute is evaluated in the `to_representation` method of the `ConfidentialFieldsMixin`, thus deleting the fields from the serialized object if the user doesn't have access.

```python
class EmployeeSerializer(ConfidentialFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = "__all__"
        confidential_fields = (
            "address_1",
            "address_2",
            "phone_number",
        )
```

### 2c. If model has owner, define `user_relation` in serializer's Meta class

Only define a `user_relation` attribute if the model in question has a user as an owner. In this particular example, the `Employee` is designed to have a one-to-one relationship with the auth user. Assuming the attribute that links the employee instance to the user instance is `login_account`, then `user_relation` is `login_account`. For cases where the user link involves hopping through multiple models, use the double underscore separator, e.g. `employee__login_account`.

```python
class User(AbstractUser):
    employee_profile = models.OneToOneField(
        "Employee",
        on_delete=models.CASCADE,
        related_name="login_account"
    )


class EmployeeSerializer(ConfidentialFieldsMixin, serializers.ModelSerializer):
    class Meta:
        ...
        user_relation = "login_account"
```

## Step 3 - add permission class to viewset

The last step is to add the `ConfidentialFieldsPermission` to the permission class list of the viewset.

```python
class EmployeeViewSet(ModelViewSet):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()
    permission_classes = [
        ...  # other permissions, e.g. IsAuthenticated
        ConfidentialFieldsPermission
    ]
```

This permission class inherits from DRF's `BasePermission` class with both the `has_permission` and `has_object_permission` methods overriden. It may seem irrelevant to override these methods considering access should be more fine-grained, but in truth, the behavior should bubble down from these higher levels. For example, if a user wanted to create a new instance that has private fields, then that user should have the confidential permission. It wouldn't make sense for a user to create an instance with partial access to some of the fields in the model.

Simply put, drf-confidential makes conservative assumptions about accessing the entire object – if users don't have the confidential permission or are not the owners or self, then they will not be able to Create/Update/Delete the object. The exception of course is Read, since field level access is evaluated downstream by `ConfidentialFieldsMixin`.

## Conclusion

[drf-confidential](https://github.com/resurrexi/drf-confidential) is a python package for Django REST applications that require fine-grained control of exposing certain fields on model objects. The package was written over a span of about a week to address the confidentiality problem for a project that I have been working on. This article describes simple steps to achieving confidentiality for your own projects. For any questions or issues regarding the package, feel free to create an issue at the package's GitHub repo.
