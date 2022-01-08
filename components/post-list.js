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
      className="group flex items-center py-3 cursor-pointer"
      onClick={() => router.push(`/posts/${slug}`)}
    >
      <div className="w-full">
        <Link href={`/posts/${slug}`}>
          <a>
            <div className="grid grid-cols-4 gap-3">
              <span className="col-span-3 truncate text-lg font-semibold text-gray-700 transition duration-300 ease-in-out sm:text-xl group-hover:text-primary-500 group-hover:translate-x-2 dark:text-gray-200 dark:group-hover:text-primary-600">
                {meta.title}
              </span>
              <div className="flex justify-end text-sm text-gray-500 transition duration-300 ease-in-out sm:text-base sm:text-transparent group-hover:text-gray-500 group-hover:-translate-x-2 dark:text-gray-400 dark:sm:text-transparent dark:group-hover:text-gray-400">
                <ReadTimer readTime={meta.readTime} />
              </div>
            </div>
          </a>
        </Link>
        <div className="mt-2 flex justify-between">
          <span className="block text-sm text-gray-500 transition duration-300 delay-100 ease-in-out sm:text-base group-hover:translate-x-2 dark:text-gray-400">
            {meta.date}
          </span>
          {meta.tags && meta.tags.length > 0 && (
            <div className="text-sm space-x-1 text-gray-500 transition duration-300 delay-100 ease-in-out sm:text-transparent group-hover:text-secondary-500 group-hover:-translate-x-2 dark:text-gray-400 dark:sm:text-transparent dark:group-hover:text-secondary-600">
              {meta.tags.map((tag) => (
                <Link key={tag} href={`/tags/${tag}`}>
                  <a
                    className="hover:text-secondary-600 hover:underline dark:hover:text-secondary-500"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    #{tag}
                  </a>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

PostList.Item = PostItem;

export default PostList;
