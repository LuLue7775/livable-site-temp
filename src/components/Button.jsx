import { twMerge } from 'tailwind-merge'
import { LoadingIconButton } from '@/components/LoadingIcon'

const baseClasses =
  'font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:translate-y-px disabled:pointer-events-none disabled:opacity-80 transition'

const impactClasses = {
  default: {
    bold: 'bg-livable text-white shadow-md hover:bg-green-100 hover:text-livable focus-visible:ring-primary-500',
    light: 'bg-green-100 text-primary-700 hover:bg-green-200 focus-visible:ring-primary-500',
    none: 'bg-transparent text-primary-700 hover:bg-green-50 focus-visible:ring-primary-500',
  },
  danger: {
    bold: 'bg-green-900 text-white shadow-md hover:bg-green-600 focus-visible:ring-green-900',
    light: 'bg-green-100 text-green-700 hover:bg-green-200 focus-visible:ring-green-900',
    none: 'bg-transparent text-green-700 hover:bg-green-50 focus-visible:ring-green-900',
  },
  success: {
    bold: 'bg-emerald-500 text-white shadow-md hover:bg-emerald-600 focus-visible:ring-emerald-500',
    light: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 focus-visible:ring-emerald-500',
    none: 'bg-transparent text-emerald-700 hover:bg-emerald-50 focus-visible:ring-emerald-500',
  },
}

const sizeClasses = {
  small: 'px-3 py-1 text-sm',
  medium: 'px-5 py-2.5 text-base',
  large: 'px-7 py-3 text-lg',
}

const shapeClasses = {
  square: 'rounded-none',
  rounded: 'rounded',
  pill: 'rounded-full',
}

function getToneFromStatus(status) {
  switch (status) {
    case 'success':
      return 'success'
    case 'error':
      return 'danger'
    default:
      return 'default'
  }
}

export default function Button({
  size = 'medium',
  impact = 'bold',
  shape = 'rounded',
  tone = 'default',
  status = 'idle',
  className,
  children,
  ...restProps
}) {
  return (
    <button
      {...restProps}
      className={twMerge(
        baseClasses,
        impactClasses[getToneFromStatus(status)][impact],
        sizeClasses[size],
        shapeClasses[shape],
        className,
      )}
    >
      {status === 'idle' ? (
        children
      ) : (
        <div className='flex items-center justify-center gap-3'>
          <span>{children}</span>
          <StatusIcon status={status} />
        </div>
      )}
    </button>
  )
}

function StatusIcon({ status }) {
  switch (status) {
    case 'loading':
      return <LoadingIconButton />
    case 'success':
      return 'success'
    case 'error':
      return 'error'
    default:
      return null
  }
}

export function Cross() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      className='h-5 w-5'
      viewBox='0 0 16 16'
    >
      <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
    </svg>
  )
}
