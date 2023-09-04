import { Navigate, Route, Routes } from 'react-router-dom'

import { AxiosInterceptor, Footer, Toast } from '@/components'
import { LoginPage } from '@/pages/Login'
import { useAppDispatch, useAppSelector } from '@/store'
import { thunkShowToast } from '@/store/toast/thunks'

import { NotFoundPage } from './NotFoundPage'
import { PrivateRoute } from './PrivateRouter'
import { PublicRoute } from './PublicRouter'
import { ChangePassword, ForgotPassword } from '../pages/ForgotPassword'
import { RegisterPage } from '../pages/Register'
import { DashboardPage } from '../pages/Dashboard'

export const AppRouter = () => {
  const dispatch = useAppDispatch()
  const { description, show, type } = useAppSelector(store => store.toast)
  return (
    <AxiosInterceptor>
      <>
        <Routes>
          <Route index path="/" element={<Navigate to="/login"></Navigate>} />
          <Route
            path="login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="forgot"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            path="auth/accounts/:token"
            element={
              <PublicRoute>
                <ChangePassword />
              </PublicRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
        {show && (
          <Toast
            type={type}
            description={description}
            callBack={() => dispatch(thunkShowToast({ show: false, type: 'success', description: '' }))}
          />
        )}
      </>
    </AxiosInterceptor>
  )
}
