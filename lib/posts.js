import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const POSTS_PATH = path.join(process.cwd(), 'posts')

function extractSlug(fileName) {
  return fileName.replace(/\.md$/, '')
}

function sortPostsByDateDesc(a, b) {
  if (a.meta.date < b.meta.date) {
    return 1
  } else if (a.meta.date > b.meta.date) {
    return -1
  } else {
    return 0
  }
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(POSTS_PATH)

  return fileNames.map(fileName => {
    return {
      params: {
        slug: extractSlug(fileName)
      }
    }
  })
}

export async function getPostData(slug) {
  const fullPath = path.join(POSTS_PATH, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const { data, content } = matter(fileContents)

  // calculate estimated reading time
  const words = content.split(" ")
  const estimatedTime = Math.round(words.length / 238)

  return {
    slug,
    meta: {
      ...data,
      readTime: estimatedTime,
    },
    content,
  }
}

export async function getAllPosts(byTag = false) {
  const fileNames = fs.readdirSync(POSTS_PATH)

  // wrap in promise since `getPostData` is async
  const allPostsData = await Promise.all(
    fileNames
      .map(extractSlug)
      .map(getPostData)
  )

  if (byTag) {
    const allTags = allPostsData.map(data => data.meta.tags).flat()
    const uniqueTags = [...new Set(allTags)]
    const tagPosts = uniqueTags.map(tag => {
      const postsWithTag = allPostsData
        .filter(data => data.meta.tags.includes(tag))
        .sort(sortPostsByDateDesc)

      return {
        tag,
        posts: postsWithTag,
        total: postsWithTag.length
      }
    })

    return tagPosts
  }

  return {
    posts: allPostsData.sort(sortPostsByDateDesc),
    total: allPostsData.length
  }
}
