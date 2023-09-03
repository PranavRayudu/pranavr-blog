import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

type SocialIconProps = {
  icon: IconProp
  title: string | undefined
  href: string | undefined
  className?: string
}

const SocialIcon = ({ icon, title, href, className = '' }: SocialIconProps) => {
  if (!href || (title === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  return (
    <a
      className="text-gray-500 hover:text-gray-400 raised-glow-md-gray-50 hover:raised-glow-intense-lg-gray-50
        dark:text-primary-500 dark:hover:text-primary-300 dark:dark-raised-glow-md-primary-500 dark:hover:dark-raised-glow-intense-lg-primary-500
        hover:-translate-y-0.5 focus:translate-y-0"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <FontAwesomeIcon
        icon={icon}
        title={title}
        className={`
        
        transition h-6 w-6 ${className}`}
      />
    </a>
  )
}

export default SocialIcon
