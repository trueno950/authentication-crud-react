import './toast.scss'

export interface ToastProps extends React.ComponentPropsWithoutRef<'div'> {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  type?: 'success' | 'failed'
  description?: string
  autoDeleteTime?: number
  callBack?: () => void
}

export const Toast = ({
  position = 'top-right',
  type = 'success',
  description = '',
  autoDeleteTime = 3000,
  callBack = () => null,
  ...props
}: ToastProps) => {
  const deleteToast = () => {
    callBack()
  }

  const showToast = () => {
    setTimeout(() => {
      callBack()
    }, autoDeleteTime)
  }

  showToast()

  return (
    <div className={`toast ${position} ${type}`} {...props}>
      <p>{description}</p>
      <span role="presentation" className="toast-close" onClick={() => deleteToast()}>
        X
      </span>
    </div>
  )
}
