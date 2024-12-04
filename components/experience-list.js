import StarIcon from "./icons/star";
import CheckIcon from "./icons/check";

function ExperienceList({ children }) {
  return (
    <nav className="py-1">
      <ol role="list" className="space-y-6 overflow-hidden">
        {children}
      </ol>
    </nav>
  );
}

function ExperienceItem({
  primary,
  secondary,
  tertiary,
  dates,
  descriptionList,
}) {
  return (
    <li className="relative">
      <div className="relative flex items-start">
        <span className="flex h-9 items-center">
          <span className="relative z-10 hidden h-5 w-5 sm:flex sm:items-center sm:justify-center">
            <StarIcon className="absolute h-full w-full text-secondary-600 dark:text-secondary-500" />
          </span>
        </span>
        <span className="flex min-w-0 flex-col sm:ml-4">
          <span className="flex flex-col dark:divide-gray-700 sm:inline-block sm:space-x-2 sm:divide-x-2 sm:divide-gray-200">
            <span className="text-sm font-semibold uppercase text-gray-900 dark:text-gray-100 sm:text-base">
              {primary}
            </span>
            {secondary && (
              <span className="text-sm text-gray-700 dark:text-gray-300 sm:pl-2 sm:text-base">
                {secondary}
              </span>
            )}
            {tertiary && (
              <span className="text-sm italic text-gray-500 dark:text-gray-400 sm:pl-2 sm:text-base">
                {tertiary}
              </span>
            )}
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 sm:text-base">
            {dates}
          </span>
          {descriptionList && descriptionList.length > 0 && (
            <span className="ml-4 mt-3 text-sm text-gray-500 dark:text-gray-400 sm:text-base">
              <ul role="list" className="space-y-2">
                {descriptionList.map((item, idx) => (
                  <li key={idx} className="relative">
                    <span className="static flex items-start">
                      <CheckIcon className="absolute -left-7 hidden h-5 w-5 text-secondary-600 dark:text-secondary-500 sm:inline-block" />
                      <span>{item}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </span>
          )}
        </span>
      </div>
    </li>
  );
}

ExperienceList.Item = ExperienceItem;

export default ExperienceList;
