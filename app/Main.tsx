import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Card from '@/components/Card'

const MAX_POST_DISPLAY = 5
const MAX_PROJECT_DISPLAY = 3

export default function Home({ posts, projects }) {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700 space-y-16">
      <div className={'mt-12'}>
        <h1
          className={
            'font-extrabold font-serif text-gray-900 dark:text-gray-100 ' +
            'text-3xl leading-16 sm:text-4xl sm:leading-14 md:text-4xl md:leading-14'
          }
        >
          Hello, my name is <br />
          <span
            className={'text-6xl leading-12 sm:text-7xl sm:leading-14 md:text-8xl md:leading-14'}
          >
            {siteMetadata.author}
          </span>
        </h1>
        <p className="text-lg leading-7 text-gray-600 dark:text-gray-400">
          {siteMetadata.description}
        </p>
      </div>

      <div>
        <div className="mt-16 space-y-2 md:space-y-5">
          <h1
            className="leading-9 font-extrabold font-serif text-gray-900 dark:text-gray-100
          text-4xl leading-16 sm:text-5xl sm:leading-14 md:text-6xl md:leading-14"
          >
            Latest Posts
          </h1>
        </div>
        <ul className={'space-y-4 py-4'}>
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_POST_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-2">
                <article>
                  <div className="xl:grid xl:grid-cols-6 xl:items-baseline xl:space-y-0">
                    <dl className={'xl:text-right xl:pr-4'}>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-600 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-5">
                      <div className="">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 font-serif">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        {/*<div className="prose max-w-none text-gray-600 dark:text-gray-400">*/}
                        {/*  {summary}*/}
                        {/*</div>*/}
                      </div>
                      {/*<div className="text-base font-medium leading-6">*/}
                      {/*  <Link*/}
                      {/*    href={`/blog/${slug}`}*/}
                      {/*    className="primary-link"*/}
                      {/*    aria-label={`Read "${title}"`}*/}
                      {/*  >*/}
                      {/*    Read more &rarr;*/}
                      {/*  </Link>*/}
                      {/*</div>*/}
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>

        {posts.length > MAX_POST_DISPLAY && (
          <div className="flex justify-end text-base font-medium leading-6">
            <Link href="/blog" className="primary-link" aria-label="All posts">
              All Posts &rarr;
            </Link>
          </div>
        )}
        {siteMetadata.newsletter?.provider && (
          <div className="flex items-center justify-center pt-4">
            <NewsletterForm />
          </div>
        )}
      </div>
      <div>
        <div className="mt-16 space-y-2 md:space-y-5">
          <h1
            className="leading-9 font-extrabold font-serif text-gray-900 dark:text-gray-100
          text-4xl leading-16 sm:text-5xl sm:leading-14 md:text-6xl md:leading-14"
          >
            Past Projects
          </h1>
        </div>
        <div className={'space-x-8 py-4'}>
          <div className="-m-4 py-4 flex flex-wrap justify-stretch content-stretch">
            {projects.slice(0, MAX_PROJECT_DISPLAY).map((d) => (
              <Card
                className={'sm:flex-1 m-4 w-full min-w-[200px]'}
                key={d.title}
                title={d.title}
                // description={d.description}
                // imgSrc={d.imgSrc}
                href={d.href}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
