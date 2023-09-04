import './input.scss'

export interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  inputSize?: 'small' | 'medium' | 'large'
}

export const Input = ({ inputSize = 'medium', className, ...props }: InputProps) => {
  const newClassName = className ? `input input-${inputSize} ${className}` : `input input-${inputSize}`
  return <input className={newClassName} {...props} />
}
