import '@/components/Input/input.scss'
import './inputSearch.scss'

export interface InputSearchProps extends React.ComponentPropsWithoutRef<'input'> {
  inputSize?: 'small' | 'medium' | 'large'
  positionIconSearch: 'left' | 'right'
}

export const InputSearch = ({
  inputSize = 'medium',
  positionIconSearch = 'left',
  className,
  placeholder = '',
  ...props
}: InputSearchProps) => {
  const newClassName = className ? `input-search ${className}` : `input-search`
  return (
    <div className={newClassName}>
      <input
        type={positionIconSearch === 'right' ? 'nosearch' : 'search'}
        className={`input input-${inputSize}`}
        placeholder={placeholder}
        {...props}
      />
    </div>
  )
}
