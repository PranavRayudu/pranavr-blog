'use client'

import { useState } from 'react'
import Link from './Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons'

const MobileNav = ({ toggle, navShow }) => {
  return (
    <div>
      <button
        aria-label="Toggle Menu"
        onClick={toggle}
        className="sm:hidden btn rounded-lg p-2 w-10 h-10 hover:text-secondary-500 dark:hover:text-secondary-400"
      >
        {navShow ? <FontAwesomeIcon icon={faClose} /> : <FontAwesomeIcon icon={faBars} />}
      </button>
    </div>
  )
}

export default MobileNav
