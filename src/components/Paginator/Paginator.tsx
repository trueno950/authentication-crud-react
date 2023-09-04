import './paginator.scss'

import { Icon } from './Icon'
import { PaginatorLink } from './PaginatorLink'
import { getPaginationItems } from './utils'

interface PaginatorProps {
  hidePages?: boolean
  paginatorText?: string
  currentPage: number
  lastPage: number
  maxLength: number
  previous: JSX.Element
  next: JSX.Element
  setCurrentPage: (page: number) => void
}

export const Paginator = ({
  hidePages = false,
  paginatorText = '',
  currentPage,
  lastPage,
  maxLength,
  previous = <Icon element={<b>{'<'}</b>} />,
  next = <Icon element={<b>{'>'}</b>} />,
  setCurrentPage
}: PaginatorProps) => {
  const pages = hidePages ? [] : getPaginationItems(currentPage, lastPage, maxLength)
  return (
    <div className="paginator">
      <p>{paginatorText}</p>
      <nav>
        <PaginatorLink
          hidePages={hidePages}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          {previous}
        </PaginatorLink>
        {pages &&
          pages.map((num, k) => (
            <PaginatorLink
              key={k}
              active={currentPage === num}
              disabled={isNaN(num)}
              onClick={() => setCurrentPage(num)}
            >
              {isNaN(num) ? '...' : num}
            </PaginatorLink>
          ))}
        <PaginatorLink
          hidePages={hidePages}
          disabled={currentPage === lastPage}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          {next}
        </PaginatorLink>
      </nav>
    </div>
  )
}
