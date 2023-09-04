import './tooltip.scss'

import React, { useState } from 'react'

export interface TooltipProps extends React.ComponentPropsWithoutRef<'div'> {
  text: string
}
export const Tooltip = ({ text, children }: TooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false)

  const handleMouseEnter = () => {
    setShowTooltip(true)
  }

  const handleMouseLeave = () => {
    setShowTooltip(false)
  }

  return (
    <div className="tooltip-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {showTooltip && (
        <div className="tooltip">
          <p>{text}</p>
        </div>
      )}
    </div>
  )
}
