'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <button
        disabled
        aria-label="Toggle Dark Mode"
        className={
          'btn rounded-lg p-2 w-10 h-10 hover:text-secondary-500 dark:hover:text-secondary-400'
        }
      >
        <FontAwesomeIcon icon={faCog} spin />
      </button>
    )
  }

  return (
    <button
      aria-label="Toggle Dark Mode"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={
        'btn rounded-lg p-2 w-10 h-10 hover:text-secondary-500 dark:hover:text-secondary-400'
      }
    >
      {mounted && theme === 'dark' ? (
        <FontAwesomeIcon icon={faMoon} />
      ) : (
        <FontAwesomeIcon icon={faSun} />
      )}
    </button>
  )
}

export default ThemeSwitch
