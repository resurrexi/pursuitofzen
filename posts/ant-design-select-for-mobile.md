---
title: "Ant Design's Select element for mobile"
date: "2022-01-04"
tags: ["react", "antdesign"]
summary: "How watching users use my app led to me to implementing a UX improvement on Ant Design's Select component."
---

As a software engineer and more importantly a UX designer, the best teachers are the users who will be using your software. After I had built an ERP application for a medical device manufacturer, I received the green light from leadership to pilot my application at their factory in China. In the 3 months that followed, I received a lot of positive and critical feedback. Some of the feedback pertained to them wanting more information printed on the barcode labels for the batches. Other feedback involved adding additional inputs to forms so that they would have better control over the flow of information from work order to work order.

Surprisingly, I did not receive any feedback with regards to user experience. Afterall, almost all the employees use their mobile phones to interact with the software. It was only during a training session where I was helping new employees acclimate to the software that I discovered a UX improvement, simply by observing how they used the application on their phones. That was Ant Design's [`Select`](https://ant.design/components/select/) component.

Ant Design's `Select` component uses custom styled dropdowns when displaying choices, and when I observed some of the factory employees attempting to select the choices, they sometimes accidentally pressed on an area outside the dropdown while scrolling that caused the component to lose focus. Even worse were for select inputs that were near the bottom of the screen, and when they touched the select input, the dropdown would render below the input, which made it nearly impossible to see the actual choices. I was surprised that none of the employees voiced their opinions on these behaviors but watching them attempting to use the component really irked me, that on the same day, I pushed a fix to make the component more mobile friendly.

<figure>
<img src="https://i.imgur.com/VEPkuqL.gif" alt="select-original" class="block mx-auto">
<figcaption align="center">Select component (original behavior)</figcaption>
</figure>

My goal for creating a mobile friendly select component was to have it behave as closely as possible to a native solution. On my Android phone, the native behavior for a select component is a modal with selectable radio buttons for each choice. Since Ant Design already has a [`Modal`](https://ant.design/components/modal/) component, I decided to leverage that component to improve its `Select` component. In addition, because the `Select` component can be searchable, I also added an [`Input`](https://ant.design/components/input/) component into the `Modal` component.

```jsx
import React, { useState, useEffect } from "react";
import { Select, Spin, Modal, List, Input } from "antd";
import { CheckOutlined } from "@ant-design/icons";

import { useDebouncedValue } from "./useDebouncedValue";

const SearchableSelect = ({
  isSearching,
  searchData,
  searchPrompt = "Enter a search term",
  searchHandler,
  modalSelect,
  onChange,
  ...rest
}) => {
  const [listValue, setListValue] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 500);

  const onModalOk = () => {
    setShowModal(false);
    onChange(listValue);
  };

  const onModalSelect = (value) => {
    setListValue(value);
  };

  const onFocus = (e) => {
    if (modalSelect) {
      e.target.blur();
      setShowModal(true);
    }
  };

  useEffect(() => {
    searchHandler(debouncedSearchTerm);
  }, [debouncedSearchTerm, searchHandler]);

  return (
    <>
      <Select
        {...rest}
        showSearch
        onSearch={setSearchTerm}
        notFoundContent={isSearching ? <Spin size="small" /> : searchPrompt}
        filterOption={false}
        open={modalSelect ? false : undefined}
        onFocus={onFocus}
        onChange={onChange}
      >
        {searchData.map((record) => (
          <Select.Option
            key={record.id}
            value={record.value}
            label={record.label}
          >
            {record.label}
          </Select.Option>
        ))}
      </Select>
      <Modal
        visible={showModal && modalSelect}
        onCancel={() => setShowModal(false)}
        closable={false}
        maskClosable={false}
        centered
        destroyOnClose
        bodyStyle={{ padding: 0 }}
        onOk={onModalOk}
      >
        <div>
          <div style={{ padding: 18 }}>
            <Input.Search
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <List
            dataSource={searchData}
            renderItem={(item) => (
              <List.Item
                key={item.key}
                onClick={() => onModalSelect(item.value)}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingLeft: "18px",
                    paddingRight: "18px",
                  }}
                >
                  <span>{item.label}</span>
                  {listValue === item.value && <CheckOutlined />}
                </div>
              </List.Item>
            )}
          />
        </div>
      </Modal>
    </>
  );
};

export default SearchableSelect;
```

Lines 42-105 is where I render my custom `SearchableSelect` component. Here, AntDesign's `Select` and `Modal` components are wrapped within a React fragment. The `Modal` will only become visible if the `showModal` state and `modalSelect` prop are true. `modalSelect` is a custom "toggle" prop that I added to allow the component to behave using either the original behavior or with the near-native behavior. There is a [`List`](https://ant.design/components/list/) component embedded in the `Modal` component to show the selection options.

A keen reader and savvy user of React may notice the `onChange` prop that I have defined in my `SearchableSelect`. This important prop is what makes this solution beautiful because I don't have to use refs, additional states, or write a custom `onChange` handler for the `Select` component. This prop is fortunately made possible due to Ant Design's implementation of [`Form.Item`](https://ant.design/components/form/#Form.Item), where in the documentation, it says:

> After wrapped by `Form.Item` with `name` property, `value`(or other property defined by `valuePropName`) `onChange`(or other property defined by trigger) props will be added to form controls...

Without this injection of the prop to the child, my `SearchableSelect` would probably have to be a big more complex. Replacing the `Select` component with my custom `SearchableSelect` component in the form gets what I need to create a better user experience on mobile.

<figure>
<img src="https://i.imgur.com/7xDvwsl.gif" alt="select-modified" class="block mx-auto">
<figcaption align="center">Select component (near-native behavior)</figcaption>
</figure>

A fully working and minimally viable demo of the component is available below. Feel free to fork the code and change `modalSelect` between `true` and `false` to observe the changes in the component's choice display behavior.

<iframe src="https://codesandbox.io/embed/obfuscated-representation-nhnuq?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="obfuscated-representation"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
