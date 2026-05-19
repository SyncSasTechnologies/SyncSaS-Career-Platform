export default function StatsCard({ icon, value, label }) {
  return (
    <div className="stats-card">
      <div className="stats-top">
        <span className="stats-icon">{icon}</span>
        <span className="stats-value">{value}</span>
      </div>
      <p className="stats-label">{label}</p>
    </div>
  );
}
