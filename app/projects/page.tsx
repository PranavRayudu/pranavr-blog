import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <>
      <div>
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 font-serif text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
          {/*<p className="text-lg leading-7 text-gray-600 dark:text-gray-400">*/}
          {/*  Showcase your projects with a hero image (16 x 9)*/}
          {/*</p>*/}
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {projectsData.map((d) => (
              <div key={d.title} className={'md max-w-[544px] p-4 md:w-1/2'}>
                <Card title={d.title} description={d.description} imgSrc={d.imgSrc} href={d.href} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
