import './Dashboard.scss'

import { useNavigate } from 'react-router-dom'

import { Card } from '@/components'
import { useAppSelector } from '@/store'
import { dashboardItems } from '@/utils'

export const DashboardPage = () => {
  const { user } = useAppSelector(store => store.me)
  const navigate = useNavigate()

  return (
    <div className="dashboard content-height">
      <div className="dashboard-title">
        <b>¡Te damos la bienvenida a tu cuenta Vale Pay!</b>
      </div>
      {user && Object.keys(user).length > 0 && (
        <div className={`dashboard-content`}>
          <div className="cards-list">
            {dashboardItems.map((card, index) => {
              return card.roles.includes(user.role) ? (
                <Card
                  key={index}
                  className={`card-item pointer`}
                  onClick={() =>
                    navigate(`/${card.path}`, {
                      state: { type: user.role, typeId: user.id }
                    })
                  }
                >
                  <div className="dashboard-item-title">
                    <span className="card-title-size color-text-blue">{card.title}</span>
                  </div>
                  <p>{card.description}</p>
                </Card>
              ) : null
            })}
          </div>
        </div>
      )}
    </div>
  )
}
