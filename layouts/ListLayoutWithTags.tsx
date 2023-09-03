/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
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
import { useState } from 'react'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            <FontAwesomeIcon icon={faChevronLeft} /> Previous
          </button>
        )}
        {prevPage && (
          <Link
            className={'primary-link'}
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            <FontAwesomeIcon icon={faChevronLeft} /> Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next <FontAwesomeIcon icon={faChevronRight} />
          </button>
        )}
        {nextPage && (
          <Link className={'primary-link'} href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState('')

  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div>
        {/*<div>*/}
        {/*  <h1 className="text-3xl font-extrabold leading-9 font-serif text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">*/}
        {/*    {title}*/}
        {/*  </h1>*/}
        {/*</div>*/}

        <div className="flex space-x-0 md:space-x-8 lg:space-x-16 flex-col md:flex-row">
          <div className="max-h-screen h-full sm:flex flex-wrap py-5 card rounded-3xl min-w-[280px] md:max-w-[280px]">
            <div className="py-4 px-6">
              {/*<h3 className="font-bold uppercase">Tags</h3>*/}
              <div className="space-y-2 pb-4 md:space-y-5">
                <div className="relative max-w-lg">
                  <label>
                    <span className="sr-only">Search articles</span>
                    <input
                      aria-label="Search articles"
                      type="text"
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="Search articles"
                      className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
                    />
                  </label>
                </div>
              </div>

              <ul className={'space-y-4 space-x-2 -ml-2'}>
                {sortedTags.map((t) => {
                  const selected = pathname.split('/tags/')[1] === slug(t)
                  return (
                    <li key={t} className={'float-left mt-4 ml-2'}>
                      <Chip
                        text={`${t} (${tagCounts[t]})`}
                        href={selected ? `/blog` : `/tags/${slug(t)}`}
                        highlight={selected}
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
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
