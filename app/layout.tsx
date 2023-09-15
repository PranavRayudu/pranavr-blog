'use client'

import 'css/tailwind.css'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { DM_Serif_Display, PT_Sans } from 'next/font/google'

// Prevent fontawesome from adding its CSS since we did it manually above
import { config } from '@fortawesome/fontawesome-svg-core'
import { KBarConfig, KBarSearchProvider } from 'pliny/src/search/KBar'
import { Action } from 'kbar'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCopy,
  faEnvelope,
  faFeather,
  faGears,
  faHouseChimney,
  faInfoCircle,
  faMoon,
  faSliders,
  faSun,
} from '@fortawesome/free-solid-svg-icons'
import { useTheme } from 'next-themes'

// https://fontawesome.com/v5/docs/web/use-with/react#getting-font-awesome-css-to-work
// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css'
import { faFacebook, faGithub, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import headerNavLinks from '@/data/headerNavLinks'
config.autoAddCss = false /* eslint-disable import/first */

//fugaz, playfair
// dm_serif_display, lobster
// Oleo_script
const old_standard = DM_Serif_Display({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
})

const pt_sans = PT_Sans({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans-serif',
})

function generateSocials(): Action[] {
  const socialSection = 'Socials'
  const socials: Action[] = [
    {
      id: siteMetadata.email || '',
      name: 'Email',
      section: socialSection,
      perform: () => {},
      icon: <FontAwesomeIcon icon={faEnvelope} fixedWidth className={'text-xs'} />,
    },
    {
      id: siteMetadata.github || '',
      name: 'Github',
      section: socialSection,
      perform: () => window.open(siteMetadata.github, '_blank'),
      icon: <FontAwesomeIcon icon={faGithub} fixedWidth className={'text-xs'} />,
    },
    {
      id: siteMetadata.facebook || '',
      name: 'Facebook',
      section: socialSection,
      perform: () => window.open(siteMetadata.facebook, '_blank'),
      icon: <FontAwesomeIcon icon={faFacebook} fixedWidth className={'text-xs'} />,
    },
    {
      id: siteMetadata.twitter || '',
      name: 'Twitter',
      section: socialSection,
      perform: () => window.open(siteMetadata.twitter, '_blank'),
      icon: <FontAwesomeIcon icon={faFacebook} fixedWidth className={'text-xs'} />,
    },
    {
      id: siteMetadata.linkedin || '',
      name: 'LinkedIn',
      section: socialSection,
      perform: () => window.open(siteMetadata.linkedin, '_blank'),
      icon: <FontAwesomeIcon icon={faLinkedin} fixedWidth className={'text-xs'} />,
    },
    {
      id: siteMetadata.youtube || '',
      name: 'Youtube',
      section: socialSection,
      perform: () => window.open(siteMetadata.youtube, '_blank'),
      icon: <FontAwesomeIcon icon={faYoutube} fixedWidth className={'text-xs'} />,
    },
  ]

  return socials.filter((social) => social.id)
}

function generateNavigation(router: AppRouterInstance): Action[] {
  const navigationSection = 'Navigation'

  const navIcons = {
    Home: faHouseChimney,
    Blog: faFeather,
    Projects: faGears,
    About: faInfoCircle,
  }

  return headerNavLinks.map((nav) => {
    return {
      id: nav.title,
      name: nav.title,
      section: navigationSection,
      icon: navIcons[nav.title] && (
        <FontAwesomeIcon icon={navIcons[nav.title]} fixedWidth className={'text-xs'} />
      ),
      perform: () => router.push(nav.href),
    }
  })
}

function MainContent(props: { children: React.ReactNode }) {
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const defaultActions = [
    {
      id: 'theme',
      name: 'Change Theme',
      keywords: 'Toggle interface theme from light to dark',
      section: 'General',
      icon: <FontAwesomeIcon icon={faSliders} fixedWidth className={'text-xs'} />,
    },
    {
      id: 'darkTheme',
      name: 'Dark',
      keywords: 'Change interface to dark theme',
      parent: 'theme',
      shortcut: ['l'],
      perform: () => setTheme('dark'),
      icon: <FontAwesomeIcon icon={faMoon} fixedWidth className={'text-xs'} />,
    },
    // { id: 'actionId', name: 'name' },
    {
      id: 'lightTheme',
      name: 'Light',
      keywords: 'Change interface to light theme',
      parent: 'theme',
      shortcut: ['d'],
      perform: () => setTheme('light'),
      icon: <FontAwesomeIcon icon={faSun} fixedWidth className={'text-xs'} />,
    },
    {
      id: 'copy',
      name: 'Copy URL',
      shortcut: ['c'],
      perform: () => navigator.clipboard.writeText(location.href),
      icon: <FontAwesomeIcon icon={faCopy} fixedWidth className={'text-xs'} />,
    },
    ...generateNavigation(router),
    ...generateSocials(),
  ]

  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between font-sans">
        <KBarSearchProvider
          kbarConfig={{
            ...(siteMetadata.search as KBarConfig).kbarConfig,
            defaultActions: defaultActions,
          }}
        >
          <Header />
          <main className="mb-auto">{props.children}</main>
        </KBarSearchProvider>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={siteMetadata.language}
      className={`${pt_sans.variable} ${old_standard.variable} font-sans scroll-smooth`}
      suppressHydrationWarning
    >
      <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
      <link rel="manifest" href="/static/favicons/site.webmanifest" />
      <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <body className="bg-gray-200 text-black antialiased dark:bg-stone-900 dark:text-white">
        <ThemeProviders>
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          <MainContent>{children}</MainContent>
        </ThemeProviders>
      </body>
    </html>
  )
}
