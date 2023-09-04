export interface SerializedError {
  name?: string
  message?: string
  stack?: string
  code?: string
  error_description: string
}

export interface ValidationErrorsInterface {
  status?: number
  error?: string
  error_code?: string
  error_description: string
}

export type ErrorType = undefined | SerializedError | ValidationErrorsInterface
