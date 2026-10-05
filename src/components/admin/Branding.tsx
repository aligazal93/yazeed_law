/* eslint-disable @next/next/no-img-element */

const logoPath = '/images/logo.png'

export function AdminLogo() {
  return (
    <div className="yaz-admin-logo">
      <img src={logoPath} alt="شركة يزيد عبد الرحمن الزهراني" />
    </div>
  )
}

export function AdminIcon() {
  return (
    <span className="yaz-admin-icon" aria-label="YAZ Law">
      <img src={logoPath} alt="" />
    </span>
  )
}
