import { Navigate } from 'react-router-dom'

import { PropsInterface } from '@/interfaces'
import { useAppSelector } from '@/store'

export const PublicRoute = ({ children }: PropsInterface) => {
  const { logged } = useAppSelector(store => store.auth)
  return !logged ? children : <Navigate to="/dashboard"></Navigate>
}
