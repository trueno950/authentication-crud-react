import type { AxiosError } from 'axios'

import { ValidationErrorsInterface } from '@/interfaces'

export const parseErrorAxios = (err: unknown) => {
  const error = err as AxiosError<ValidationErrorsInterface>
  if (!error.response) throw err
  else {
    const status = error.response?.status
    const error_code = error.response?.data.error || error.response?.data.error_code
    const error_description = error.response?.data.error_description
    return { status, error_code, error_description }
  }
}
