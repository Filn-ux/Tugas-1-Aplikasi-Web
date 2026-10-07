function StatCard({ label, value, variant = "", note = "" }) {
  return (
    <div className={`stat-card ${variant}`.trim()}>
      <span>{label}</span>
      <strong>{value}</strong>
      {note && <small>{note}</small>}
    </div>
  );
}

export default StatCard;
