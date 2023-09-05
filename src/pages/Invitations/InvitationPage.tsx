import './invitations.scss'

import { useCallback, useEffect } from 'react'

import { Loader } from '@/components'
import { useAppDispatch, useAppSelector } from '@/store'
import { thunkShowToast } from '@/store/toast/thunks'
import { thunkGetInvitation } from '../../store/invitation/thunks'

interface Props {
  invitationId: string
}
export const InvitationPage = ({ invitationId }: Props) => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(store => store.user)
  const { invitation, loadingInvitation } = useAppSelector(store => store.invitation)

  const get_info_invitation = useCallback(() => {
    if (invitationId) {
      dispatch(thunkGetInvitation({ invitationId })).catch(() => {
        dispatch(
          thunkShowToast({
            show: true,
            type: 'failed',
            description: 'Ha ocurrido un error al obtener la información del cupón'
          })
        )
      })
    }
  }, [invitationId, dispatch])

  useEffect(() => {
    get_info_invitation()
  }, [get_info_invitation])

  return (
    <>
      {loadingInvitation && <Loader>Cargando información del cupón</Loader>}
      {!loadingInvitation && (
        <div className="invitations content-height">
          <header className="invitations-header-details">
            <h2>Información de la invitación</h2>
          </header>
          {invitation && (
            <>
              <div className="invitations-content-details">
                <div className="invitations-details">
                  <div className="invitations-title-details">
                    <h3>Datos de la invitación</h3>
                  </div>
                  <div className="invitations-details-item">
                    <strong>Código:</strong> {invitation.guestName}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
