import './header.scss'

import { useEffect, useState } from 'react'
import { Button, Modal } from '@/components'
import { useAppDispatch, useAppSelector } from '@/store'
import { logout, thunkLogout } from '@/store/auth/thunks'
import { logoutUser, thunkGetMe } from '@/store/user/thunks'

export const Header = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(store => store.me)
  const { token_info } = useAppSelector(store => store.auth)

  const [showConfirm, setShowConfirm] = useState(false)

  const onLogout = () => {
    setShowConfirm(false)
    dispatch(thunkLogout())
      .unwrap()
      .then(() => {
        dispatch(logoutUser())
        dispatch(logout())
      })
  }

  useEffect(() => {
    dispatch(thunkGetMe({ userId: String(token_info?.user.id) }))
  }, [dispatch, token_info?.user.id])

  return (
    <header className="header">
      <div className="header-wrapper">
        {user?.firstName && (
          <div className="header-actions">
            {/* <UserIcon
              width={25}
              className="header-icons"
              onClick={() => areBooleanValuesValid && navigate('/profile')}
            /> */}
            {/* <RightFromBracketIcon width={25} className="header-icons" onClick={() => setShowConfirm(true)} /> */}
          </div>
        )}
      </div>
      {showConfirm && (
        <Modal
          elementTitle={
            <div className="modal-title">
              <b>Cerrar sesión</b>
              {/* <XmarkIcon
                className="modal-close-icon cursor-pointer"
                width={10}
                height={10}
                onClick={() => setShowConfirm(false)}
              /> */}
            </div>
          }
          elementFooter={
            <div className="modal-footer">
              <Button title="Cerrar sesión" format="primary" size="small" onClick={() => onLogout()}></Button>
              <Button title="Cancelar" format="outline" size="small" onClick={() => setShowConfirm(false)}></Button>
            </div>
          }
        >
          <div className="modal-body">
            <span>¿Estás seguro de que quieres cerrar sesión?</span>
          </div>
        </Modal>
      )}
    </header>
  )
}
