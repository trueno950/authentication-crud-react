import './SortDirection.scss'

import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

type SortDirectionProps = {
  defaultDirection?: 'ASC' | 'DESC'
  onDirectionChange: (direction: 'ASC' | 'DESC') => void
  labelAsc?: string
  labelDesc?: string
}

export const SortDirection: React.FC<SortDirectionProps> = ({
  defaultDirection = 'DESC',
  onDirectionChange,
  labelAsc = 'Ascendente',
  labelDesc = 'Descendente'
}) => {
  const [direction, setDirection] = useState<'ASC' | 'DESC'>(defaultDirection)

  const toggleDirection = () => {
    const newDirection = direction === 'ASC' ? 'DESC' : 'ASC'
    setDirection(newDirection)
    onDirectionChange(newDirection)
  }

  return (
    <button className={`sort-direction ${direction} button button-outline button-small`} onClick={toggleDirection}>
      <span className="sort-text">{direction === 'ASC' ? labelAsc : labelDesc}</span>
      {direction === 'ASC' && <FontAwesomeIcon icon={faSortUp} />}
      {direction === 'DESC' && <FontAwesomeIcon icon={faSortDown} />}
    </button>
  )
}
