import './label.scss'

export interface LabelProps extends React.ComponentPropsWithoutRef<'label'> {
  labelText: string | undefined
  htmlFor?: string | undefined
  labelSize?: 'small' | 'medium' | 'large'
  error?: boolean
}

export const Label = ({ labelText, htmlFor, labelSize = 'medium', error, className, ...props }: LabelProps) => {
  const newClassName = className
    ? `label label-${labelSize} ${error && 'label-error'} ${className}`
    : `label label-${labelSize} ${error && 'label-error'} ${className}`
  return (
    <label className={newClassName} htmlFor={htmlFor} {...props}>
      {labelText}
    </label>
  )
}
