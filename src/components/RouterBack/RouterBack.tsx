import './routerBack.scss'

import { useNavigate } from 'react-router-dom'

import { BackIcon } from '@/assets/icons'

interface RouterBackProps extends React.ComponentPropsWithoutRef<'div'> {
  icon?: JSX.Element
}

export const RouterBack = ({ icon, children, ...props }: RouterBackProps) => {
  const navigate = useNavigate()

  return (
    <div className="router-back" role="presentation" onClick={() => navigate(-1)} {...props}>
      {icon ? icon : <BackIcon />}
      {children}
    </div>
  )
}
