// import 'react-datepicker/dist/react-datepicker.css'
// import './InputDate.scss'

// import React, { useRef } from 'react'
// import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

// type DateRangePickerProps = {
//   onChange: (start: Date | null, end: Date | null) => void
//   startDate: Date | null
//   endDate: Date | null
//   placeholder?: string
// } & Omit<ReactDatePickerProps, 'onChange' | 'selected'>

// export const InputDate: React.FC<DateRangePickerProps> = ({
//   onChange,
//   startDate,
//   endDate,
//   placeholder,
//   ...datepickerProps
// }) => {
//   const inputRef = useRef<HTMLInputElement>(null)

//   const handleDateChange = (dates: [Date | null, Date | null] | null) => {
//     const [start, end] = dates || [null, null]
//     onChange(start, end)
//   }

//   const handleBlur = () => {
//     if (inputRef.current) {
//       inputRef.current.blur()
//     }
//   }

//   return (
//     <div className="input input-date">
//       <DatePicker
//         {...datepickerProps}
//         selectsRange
//         shouldCloseOnSelect
//         isClearable
//         selected={startDate}
//         startDate={startDate}
//         endDate={endDate}
//         customInput={<input ref={inputRef} />}
//         dateFormat="dd/MM/yyyy"
//         placeholderText={placeholder}
//         onChange={handleDateChange}
//         onBlur={handleBlur}
//       />
//     </div>
//   )
// }
