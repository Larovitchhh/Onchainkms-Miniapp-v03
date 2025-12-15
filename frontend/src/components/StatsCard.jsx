export default function StatsCard({ label, value, sub }) {
  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 8,
        padding: 12,
        minWidth: 90,
        background: "rgba(0,0,0,0.02)",
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.6 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 600 }}>{value}</div>

      {sub && (
        <div style={{ fontSize: 11, opacity: 0.5 }}>
          {sub}
        </div>
      )}
    </div>
  );
}
