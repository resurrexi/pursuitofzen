import Link from "next/link";
import { useRouter } from "next/router";
import ReadTimer from "./read-timer";

function PostList({ children }) {
  return <ul>{children}</ul>;
}

function PostItem({ slug, meta }) {
  const router = useRouter();

  return (
    <li
      className="group flex cursor-pointer items-center py-3"
      onClick={() => router.push(`/posts/${slug}`)}
    >
      <div className="w-full">
        <Link href={`/posts/${slug}`}>
          <div className="grid grid-cols-4 gap-3">
            <span className="col-span-3 truncate text-lg font-semibold text-gray-700 transition duration-300 ease-in-out group-hover:translate-x-2 group-hover:text-primary-500 dark:text-gray-200 dark:group-hover:text-primary-600 sm:text-xl">
              {meta.title}
            </span>
            <div className="flex justify-end text-sm text-gray-500 transition duration-300 ease-in-out group-hover:-translate-x-2 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400 sm:text-base sm:text-transparent dark:sm:text-transparent">
              <ReadTimer readTime={meta.readTime} />
            </div>
          </div>
        </Link>
        <div className="mt-2 flex justify-between">
          <span className="block text-sm text-gray-500 transition delay-100 duration-300 ease-in-out group-hover:translate-x-2 dark:text-gray-400 sm:text-base">
            {meta.date}
          </span>
          {meta.tags && meta.tags.length > 0 && (
            <div className="space-x-1 text-sm text-gray-500 transition delay-100 duration-300 ease-in-out group-hover:-translate-x-2 group-hover:text-secondary-500 dark:text-gray-400 dark:group-hover:text-secondary-600 sm:text-transparent dark:sm:text-transparent">
              {meta.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="hover:text-secondary-600 hover:underline dark:hover:text-secondary-500"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>
        {meta.summary && (
          <div className="mt-2 block">
            <p className="text-sm text-gray-600 transition delay-200 duration-300 ease-in-out group-hover:translate-x-2 dark:text-gray-500 sm:text-base">
              {meta.summary}
            </p>
          </div>
        )}
      </div>
    </li>
  );
}

PostList.Item = PostItem;

export default PostList;
