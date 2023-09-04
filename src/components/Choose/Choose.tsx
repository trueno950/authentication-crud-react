import './Choose.scss'

import React from 'react'

interface Option {
  value: string
  label: string
}

type ChooseProps = {
  options: Option[]
  selected: Option[]
  onSelect: (selectedOptions: Option[]) => void
}

export const Choose: React.FC<ChooseProps> = ({ options, selected, onSelect }) => {
  const handleSelect = (option: Option) => {
    const isSelected = selected.some(selectedOption => selectedOption.value === option.value)

    if (isSelected) {
      const updatedSelected = selected.filter(selectedOption => selectedOption.value !== option.value)
      onSelect(updatedSelected)
    } else {
      const updatedSelected = [...selected, option]
      onSelect(updatedSelected)
    }
  }

  return (
    <div className="choose">
      {options.map(option => (
        <button
          key={option.value}
          className={`choose-option ${
            selected.some(selectedOption => selectedOption.value === option.value) ? 'selected' : ''
          }`}
          onClick={() => handleSelect(option)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
