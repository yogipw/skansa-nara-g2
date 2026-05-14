export default function StatCard({ label, value, accent = 'var(--purple)' }) {
  return (
    <div className="admin-stat" style={{ borderColor: `${accent}44` }}>
      <span style={{ color: accent }}>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
