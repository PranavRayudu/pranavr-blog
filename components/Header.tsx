'use client'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import { Component, useState } from 'react'

const Header = () => {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      // if (status) {
      //   document.body.style.overflow = 'auto'
      // } else {
      //   // Prevent scrolling
      //   document.body.style.overflow = 'hidden'
      // }
      return !status
    })
  }

  return (
    <div className={'relative'}>
      <header className="flex items-center justify-between pt-10">
        <div>
          <Link href="/" aria-label={siteMetadata.headerTitle}>
            <div className="flex items-center justify-between">
              <div
                className="mr-3 rounded-full transition
              border-gray-950 border-2 dark:border-transparent
              dark:dark-raised-glow-lg-yellow-500 dark:hover:dark-raised-glow-intense-lg-yellow-500"
              >
                <Logo className="h-16 w-16" viewBox={'0 0 512 512'} />
              </div>
              {typeof siteMetadata.headerTitle === 'string' ? (
                <div className="hidden text-3xl font-extrabold font-serif sm:block">
                  {siteMetadata.headerTitle}
                </div>
              ) : (
                siteMetadata.headerTitle
              )}
            </div>
          </Link>
        </div>
        <div className="flex items-center leading-5 space-x-4 sm:space-x-6">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hidden sm:block font-medium text-gray-900 dark:text-gray-100 hover:text-secondary-500 dark:hover:text-secondary-400"
              >
                {link.title}
              </Link>
            ))}
          <SearchButton />
          <ThemeSwitch />
          <MobileNav toggle={onToggleNav} navShow={navShow} />
        </div>
      </header>

      <div
        className={`absolute right-0 sm:hidden transition origin-top-right ${
          navShow ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        <nav className="rounded-3xl border py-4 card bg-gray-200 dark:bg-gray-900">
          {headerNavLinks.map((link) => (
            <div key={link.title} className="px-8 py-4 text-right">
              <Link
                href={link.href}
                className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100 primary-link"
                onClick={onToggleNav}
              >
                {link.title}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Header
