import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import {
  faFacebook,
  faGithub,
  faLinkedin,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon
            icon={faEnvelope}
            title="mail"
            href={`mailto:${siteMetadata.email}`}
            size={6}
          />
          <SocialIcon icon={faGithub} title="github" href={siteMetadata.github} size={6} />
          <SocialIcon icon={faFacebook} title="facebook" href={siteMetadata.facebook} size={6} />
          <SocialIcon icon={faYoutube} title="youtube" href={siteMetadata.youtube} size={6} />
          <SocialIcon icon={faLinkedin} title="linkedin" href={siteMetadata.linkedin} size={6} />
          <SocialIcon icon={faTwitter} title="twitter" href={siteMetadata.twitter} size={6} />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
        <div className="mb-8 text-sm text-gray-600 dark:text-gray-400">
          <Link href="https://github.com/PranavRayudu/pranavr-blog">Site Source</Link>
        </div>
      </div>
    </footer>
  )
}
