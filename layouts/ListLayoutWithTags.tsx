/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

// import { usePathname } from 'next/navigation'
import GithubSlugger, { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Chip from '@/components/Chip'
import { queryTypes, useQueryState } from 'next-usequerystate/app'
import { useMemo } from 'react'

const POSTS_PER_PAGE = 5

interface PaginationProps {
  totalPages: number
  currentPage: number
  nextPage: () => void
  prevPage: () => void
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
}

function Pagination({ totalPages, currentPage, nextPage, prevPage }: PaginationProps) {
  // const pathname = usePathname()
  // const basePath = pathname.split('/')[1]
  const prevPageNum = currentPage - 1 > 0
  const nextPageNum = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPageNum && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPageNum}>
            <FontAwesomeIcon icon={faChevronLeft} /> Previous
          </button>
        )}
        {prevPageNum && (
          <button className={'primary-link'} onClick={prevPage} rel="prev">
            <FontAwesomeIcon icon={faChevronLeft} /> Previous
          </button>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPageNum && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPageNum}>
            Next <FontAwesomeIcon icon={faChevronRight} />
          </button>
        )}
        {nextPageNum && (
          <button className={'primary-link'} onClick={nextPage} rel="next">
            Next <FontAwesomeIcon icon={faChevronRight} />
          </button>
        )}
      </nav>
    </div>
  )
}

function getTagCount(posts: CoreContent<Blog>[]) {
  const tagCount: Record<string, number> = {}
  posts.forEach((post) => {
    if (post.tags && post.draft !== true) {
      post.tags.forEach((tag) => {
        const formattedTag = GithubSlugger.slug(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })
  return tagCount
}

interface FiltersInterface {
  // pageNumber: number
  searchTerm: string | null
  tags: string[]
}
function filterPosts(posts: CoreContent<Blog>[], filters: FiltersInterface): CoreContent<Blog>[] {
  return posts
    .filter((post) => {
      if (filters.searchTerm == null) return true
      const searchContent = post.title + post.summary + post.tags?.join(' ')
      return searchContent.toLowerCase().includes(filters.searchTerm.toLowerCase())
    })
    .filter((post) => {
      if (filters.tags == null || filters.tags.length == 0) return true
      // post.draft !== true && post.tags && post.tags.map((t) => slug(t)).includes(tag)
      return filters.tags.every((t) => post.tags.map((t) => slug(t)).includes(t))
      // return post.tags.map((t) => slug(t)).every((tag) => filters.tags.includes(tag))
    })
}

export default function ListLayoutWithTags({ posts }: ListLayoutProps) {
  const [pageNumber, setPageNumber] = useQueryState('page', {
    ...queryTypes.integer.withDefault(1),
    history: 'push',
  })

  const [searchTerm, setSearchTerm] = useQueryState('search')

  const [tags, setTags] = useQueryState('tags', queryTypes.array(queryTypes.string).withDefault([]))

  const setSearch = function (value: string) {
    setSearchTerm(value)
    if (pageNumber > 1) setPageNumber(1)
  }

  const nextPage = function () {
    if (pageNumber < pagination.totalPages) setPageNumber(pageNumber + 1)
  }

  const prevPage = function () {
    if (pageNumber > 1) setPageNumber(pageNumber - 1)
  }

  const toggleTag = function (tag: string) {
    if (tag == null) return
    if (tags.includes(tag)) {
      setTags(tags.filter((x) => x != tag))
    } else {
      setTags([...tags, tag])
    }
    if (pageNumber > 1) setPageNumber(1)
  }

  // const filteredPosts = filterPosts(posts, { pageNumber, tags, searchTerm })
  const filteredPosts = useMemo(
    () => filterPosts(posts, { tags, searchTerm }),
    [posts, tags, searchTerm]
  )

  const displayPosts = filteredPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )

  const tagCounts = getTagCount(filteredPosts)

  const allTags = Object.keys(tagData)

  const allTagsSorted = allTags.sort((a, b) => tagData[b] - tagData[a])

  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
    nextPage: nextPage,
    prevPage: prevPage,
  }

  return (
    <>
      <div>
        <div className="flex space-x-0 md:space-x-8 lg:space-x-16 flex-col md:flex-row">
          <div className="max-h-screen h-full sm:flex flex-wrap py-5 card rounded-3xl min-w-[280px] md:max-w-[280px]">
            <div className="py-4 px-6">
              {/*<h3 className="font-bold uppercase">Tags</h3>*/}
              <div className="space-y-2 pb-4 md:space-y-5">
                <div className="relative max-w-lg">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500 dark:text-gray-500">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </div>
                  <label>
                    <span className="sr-only">Search articles</span>
                    <input
                      aria-label="Search articles"
                      type="text"
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search articles"
                      className="block w-full rounded-3xl border border-gray-300 bg-white px-4 py-2 pl-10 text-gray-900 focus:border-primary-500 dark:focus:inset-sm-gray-900 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
                      value={searchTerm || ''}
                    />
                  </label>
                </div>
              </div>

              <ul className={'space-y-4 space-x-2 -ml-2'}>
                {allTagsSorted.map((t) => {
                  const selected = tags.includes(t)
                  const disabled = !(t in tagCounts)
                  return (
                    <li key={t} className={'float-left mt-4 ml-2'}>
                      <Chip
                        text={`${t} (${tagCounts[t] || 0})`}
                        onClick={() => toggleTag(t)}
                        highlight={!disabled && selected}
                        disabled={disabled}
                      />
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div>
            <ul>
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags } = post
                return (
                  <li key={path} className="py-5">
                    <article className="space-y-2 flex flex-col xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-600 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        </dd>
                      </dl>
                      <div className="space-y-3">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 font-serif">
                            <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-600 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
            {pagination && pagination.totalPages > 1 && <Pagination {...pagination} />}
          </div>
        </div>
      </div>
    </>
  )
}
