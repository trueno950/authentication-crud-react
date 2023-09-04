import './card.scss'

export const Card = ({ className, children, ...props }: React.ComponentPropsWithoutRef<'div'>) => {
  const newClassName = className ? `card ${className}` : `card`
  return (
    <div className={newClassName} {...props}>
      {children}
    </div>
  )
}
