import CheckCircleIcon from "./icons/check-circle";

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
    <li className={`${!isLast ? "pb-4" : ""} relative`}>
      {/* !isLast && (
        <div
          className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-secondary-600 dark:bg-secondary-500"
          aria-hidden="true"
        />
      ) */}
      <div className="relative flex items-start">
        <span className="h-9 flex items-center">
          <span className="relative z-[5] w-8 h-8 flex items-center justify-center">
            <CheckCircleIcon className="absolute h-5 w-5 text-secondary-600 transition-colors duration-1000 ease-in-out bg-white dark:bg-neutral-900 dark:text-secondary-500" />
          </span>
        </span>
        <span className="ml-4 min-w-0 flex flex-col">
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
            <span className="text-sm text-gray-500 sm:text-base dark:text-gray-400">
              <ul className="list-disc list-inside">
                {descriptionList.map((item, idx) => (
                  <li key={idx} className="py-1">
                    {item}
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
