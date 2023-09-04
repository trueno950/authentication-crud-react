import './modal.scss'

export interface ModalProps extends React.ComponentPropsWithoutRef<'div'> {
  elementTitle?: JSX.Element
  elementFooter?: JSX.Element
}

export const Modal = ({ title = '', className, children, elementTitle, elementFooter, ...props }: ModalProps) => {
  const newClassName = className ? `modal ${className}` : `modal`
  return (
    <div className={newClassName} {...props}>
      <div className="modal-content">
        <div className="modal-header">{elementTitle ? elementTitle : <span>{title}</span>}</div>
        {children}
        <div className="modal-footer">{elementFooter ? elementFooter : <></>}</div>
      </div>
    </div>
  )
}
