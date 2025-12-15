export default function ActivityItem({ activity }) {
  const statusColor = {
    pending: "#f59e0b",
    verified: "#10b981",
    minted: "#6366f1",
  };

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontWeight: 600 }}>{activity.title}</div>
          <div style={{ fontSize: 12, opacity: 0.6 }}>
            {activity.date}
          </div>
        </div>

        <div
          style={{
            fontSize: 12,
            color: statusColor[activity.status],
            fontWeight: 600,
          }}
        >
          {activity.status.toUpperCase()}
        </div>
      </div>

      <div
        style={{
          marginTop: 8,
          fontSize: 13,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>+{activity.xp} XP</span>

        {activity.status === "verified" && (
          <button
            onClick={() =>
              activity.onMint && activity.onMint(activity)
            }
            style={{
              border: "none",
              background: "#000",
              color: "#fff",
              padding: "4px 8px",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Mint
          </button>
        )}
      </div>
    </div>
  );
}
