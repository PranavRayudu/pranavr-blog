import Link from 'next/link'
interface Props {
  text: string
  onClick?: () => void
  highlight?: boolean
  disabled?: boolean
}

const Chip = ({ text, onClick, highlight, disabled }: Props) => {
  if (disabled && highlight) throw new Error('invalid Chip state')
  const colors = highlight
    ? `bg-secondary-300 raised-glow-md-secondary-500 dark:bg-secondary-500 dark:dark-raised-glow-md-secondary-500 border border-opacity-60 border-secondary-400 dark:border-secondary-700`
    : `text-gray-600 bg-gray-200 raised-glow-sm-gray-100 dark:text-gray-500 dark:bg-gray-800 dark:dark-raised-glow-md-gray-800 border border-opacity-60 border-gray-400 dark:border-gray-700`
  if (disabled) {
    return (
      <button
        disabled={disabled}
        className={`whitespace-nowrap rounded-full px-2 py-0.5 block cursor-not-allowed text-gray-400 bg-gray-100 dark:text-gray-700 dark:bg-gray-800  border border-opacity-60 border-gray-400 dark:border-gray-700`}
      >
        {text}
      </button>
    )
  }
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap text-black rounded-full px-2 py-0.5 block transition-transform hover:-translate-y-0.5 focus:!drop-shadow-none focus:translate-y-0 ${colors}`}
    >
      {text}
    </button>
  )
}

export default Chip
