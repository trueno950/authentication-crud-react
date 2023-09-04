import './button.scss'

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  format?: 'default' | 'primary' | 'outline'
  size?: 'small' | 'medium' | 'large'
}

export const Button = ({ format = 'default', size = 'medium', className, title, children, ...props }: ButtonProps) => {
  const newClassName = className
    ? `button button-${format} button-${size} ${className}`
    : `button button-${format} button-${size}`
  return (
    <button className={newClassName} {...props}>
      {children}
      {title}
    </button>
  )
}
