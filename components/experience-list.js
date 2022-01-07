import StarIcon from "./icons/star";
import CheckIcon from "./icons/check";

function ExperienceList({ children }) {
  return (
    <nav>
      <ol role="list" className="overflow-hidden">
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
  isLast,
}) {
  return (
    <li className={`${!isLast ? "pb-6" : ""} relative`}>
      <div className="relative flex items-start">
        <span className="h-9 flex items-center">
          <span className="hidden relative z-10 w-5 h-5 sm:flex sm:items-center sm:justify-center">
            <StarIcon className="absolute h-full w-full text-secondary-600 dark:text-secondary-500" />
          </span>
        </span>
        <span className="min-w-0 flex flex-col sm:ml-4">
          <span className="flex flex-col sm:inline-block sm:space-x-2 sm:divide-x-2 sm:divide-gray-200 dark:divide-gray-800">
            <span className="text-sm font-semibold uppercase text-gray-900 sm:text-base dark:text-gray-100">
              {primary}
            </span>
            {secondary && (
              <span className="text-sm text-gray-700 sm:pl-2 sm:text-base dark:text-gray-300">
                {secondary}
              </span>
            )}
            {tertiary && (
              <span className="text-sm text-gray-500 italic sm:pl-2 sm:text-base dark:text-gray-400">
                {tertiary}
              </span>
            )}
          </span>
          <span className="text-sm text-gray-700 font-medium sm:text-base dark:text-gray-300">
            {dates}
          </span>
          {descriptionList && descriptionList.length > 0 && (
            <span className="ml-4 mt-3 text-sm text-gray-500 sm:text-base dark:text-gray-400">
              <ul role="list" className="space-y-2">
                {descriptionList.map((item, idx) => (
                  <li key={idx} className="relative">
                    <span className="static flex items-start">
                      <CheckIcon className="hidden absolute -left-7 h-5 w-5 text-secondary-600 sm:inline-block dark:text-secondary-500" />
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
