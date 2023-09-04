import './loader.scss'

export const Loader = ({ className, children, ...props }: React.ComponentPropsWithoutRef<'div'>) => {
  const newClassName = className ? `loader-container ${className}` : `loader-container`
  return (
    <div className={newClassName} {...props}>
      <div className="loading-spinner"></div>
      {children}
    </div>
  )
}
