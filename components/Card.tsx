import Image from './Image'
import Link from './Link'

interface Props {
  title: string
  description?: string
  imgSrc?: string
  href?: string
  className?: string
}

const Card = ({ title, description, imgSrc, href, className }: Props) => (
  <div className={`${className} ${imgSrc && 'h-full'} overflow-hidden rounded-3xl card`}>
    {imgSrc &&
      (href ? (
        <Link href={href} aria-label={`Link to ${title}`}>
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        </Link>
      ) : (
        <Image
          alt={title}
          src={imgSrc}
          className="object-cover object-center md:h-36 lg:h-48"
          width={544}
          height={306}
        />
      ))}
    <div className="p-6">
      <h2 className="mb-3 text-2xl font-bold leading-8 font-serif">
        {href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            {title}
          </Link>
        ) : (
          title
        )}
      </h2>
      {description && (
        <p className="prose mb-3 max-w-none text-gray-600 dark:text-gray-400">{description}</p>
      )}
      {href && (
        <Link
          href={href}
          className="text-base font-medium leading-6 primary-link"
          aria-label={`Link to ${title}`}
        >
          Learn more &rarr;
        </Link>
      )}
    </div>
  </div>
)

export default Card
