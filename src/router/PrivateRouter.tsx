import { Navigate } from 'react-router-dom'

import { Header } from '../components'
import { PropsInterface } from '@/interfaces'
import { useAppSelector } from '@/store'

export const PrivateRoute = ({ children }: PropsInterface) => {
  const { logged } = useAppSelector(store => store.auth)
  return !logged ? (
    <Navigate to="/login"></Navigate>
  ) : (
    <>
      <Header />
      <div className="router-private-height">{children}</div>
    </>
  )
}
