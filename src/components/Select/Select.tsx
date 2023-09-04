import './select.scss'

export interface SelectProps extends React.ComponentPropsWithoutRef<'select'> {
  selectSize?: 'small' | 'medium' | 'large'
}

export const Select = ({ selectSize = 'medium', className, children, ...props }: SelectProps) => {
  const newClassName = className ? `select select-${selectSize} ${className}` : `select select-${selectSize}`
  return (
    <select className={newClassName} {...props}>
      {children}
    </select>
  )
}
