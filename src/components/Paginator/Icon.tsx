import './paginator.scss'

interface IconProps {
  element?: JSX.Element
}

export const Icon = ({ element }: IconProps) => {
  return <i> {element} </i>
}
