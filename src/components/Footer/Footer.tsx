import './footer.scss'

import { FacebookIcon, InstagramIcon, TwitterIcon } from '@/assets/icons'

export const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <a href="#top">Prueba Nextia</a>
        <a href="#top">Política de privacidad</a>
        <a href="#top">Aviso legal</a>
        <a href="#top">Términos y condiciones</a>
        <a href="#top">Política de cookies</a>
      </div>
      <div className="footer-social-networks">
        <div className="footer-social-network">
          <FacebookIcon width={15} height={15} />
        </div>
        <div className="footer-social-network">
          <TwitterIcon width={15} height={15} />
        </div>
        <div className="footer-social-network">
          <InstagramIcon width={12} height={12} />
        </div>
      </div>
    </footer>
  )
}
