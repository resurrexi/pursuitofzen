import Link from 'next/link'
import { useRouter } from 'next/router'
import ClockIcon from './icons/clock'

function PostList({ children }) {
  return (
    <ul className="px-2">
      {children}
    </ul>
  )
}

function PostItem({ slug, meta }) {
  const router = useRouter()

  return (
    <li
      className="group flex items-center py-3 cursor-pointer"
      onClick={() => router.push(`/posts/${slug}`)}
    >
      <div className="w-full">
        <div className="flex justify-between">
          <span className="block truncate text-lg font-bold text-gray-700 transition duration-300 ease-in-out sm:text-xl group-hover:text-primary-500 group-hover:translate-x-2">
            {meta.title}
          </span>
          <div className="flex items-center text-base text-gray-500 transition duration-300 ease-in-out sm:text-transparent group-hover:text-gray-500 group-hover:-translate-x-2">
            <ClockIcon />
            <span className="ml-2">
              {meta.readTime} min
            </span>
          </div>
        </div>
        <div className="mt-2 flex justify-between">
          <span className="block text-base text-gray-500 transition duration-300 delay-100 ease-in-out group-hover:translate-x-2">
            {meta.date}
          </span>
          {meta.tags && meta.tags.length > 0 && (
            <div className="text-sm space-x-1 text-gray-500 transition duration-300 delay-100 ease-in-out sm:text-transparent group-hover:text-secondary-500 group-hover:-translate-x-2">
              {meta.tags.map(tag => (
                <Link key={tag} href={`/tags/${tag}`}>
                  <a className="hover:text-secondary-600 hover:underline">
                    #{tag}
                  </a>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

PostList.Item = PostItem

export default PostList
