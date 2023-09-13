import cx from 'classnames'

export function Input({ name, id, label, type = 'text', required = false, register, ...props }) {
  return (
    <div>
      <label
        htmlFor={id}
        className={cx(
          'relative text-sm ',
          required && 'after:-right- after:absolute after:-top-1 after:h-4 after:w-2 after:content-["*"]',
        )}
      >
        {label}
      </label>
      <input
        className={cx(
          `block w-full px-4 py-1 text-sm 
        ring-1 ring-inset ring-green-600 focus:outline-none focus:ring-green-900`,
        )}
        type={type}
        name={name}
        id={id}
        {...register(id)}
        {...props}
      />
    </div>
  )
}

export function Textarea({ name, id, label, rows = 6, required = false, register, ...props }) {
  return (
    <div>
      <label
        htmlFor={id}
        className={cx(
          'relative text-sm ',
          required && 'after:-right- after:absolute after:-top-1 after:h-2 after:w-2 after:content-["*"]',
        )}
      >
        {label}
      </label>
      <textarea
        className={cx(
          `block w-full px-4 py-1 text-sm 
        ring-1 ring-inset ring-green-600 focus:outline-none focus:ring-green-900`,
        )}
        name={name}
        id={id}
        {...register(id)}
        {...props}
      />
    </div>
  )
}
