import './paginator.scss'

import { HTMLProps } from 'react'

interface PaginatorLinkProps extends HTMLProps<HTMLAnchorElement> {
  active?: boolean
  hidePages?: boolean
}

export const PaginatorLink = ({ className, active, hidePages, disabled, children, ...props }: PaginatorLinkProps) => {
  let newClassName = 'paginator-link'
  if (className) newClassName += ` ${className}`
  if (active) newClassName += ` active`
  if (hidePages) newClassName += ` hide-pages`
  if (disabled) {
    newClassName += ` disabled`
    return <span className={newClassName}>{children}</span>
  }
  return (
    <a className={newClassName} aria-current={active ? 'page' : undefined} {...props}>
      {children}
    </a>
  )
}
