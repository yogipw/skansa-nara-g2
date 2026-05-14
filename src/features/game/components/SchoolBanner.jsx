export default function SchoolBanner({ tagline = 'Generasi Siaga Narkotika 💪', badge = 'KALTIM' }) {
  return (
    <div className="school-banner">
      <span className="school-logo-emoji">🏫</span>
      <div className="school-banner-text">
        <div className="school-name">SMK Negeri 1 Kongbeng</div>
        <div className="school-tagline">{tagline}</div>
      </div>
      {badge ? <span className="school-badge-sm">{badge}</span> : null}
    </div>
  );
}
