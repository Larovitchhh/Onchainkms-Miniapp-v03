export default function TabBar({ active, onChange }) {
  const tabs = [
    { key: "Home", label: "Home", icon: "🏠" },
    { key: "Profile", label: "Profile", icon: "👤" },
    { key: "Activity", label: "Activity", icon: "🏃" },
    { key: "Mint", label: "Mint", icon: "✨" },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        marginBottom: 16,
        justifyContent: "space-between",
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === active;

        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px 4px",
              borderRadius: 8,
              border: "1px solid",
              background: isActive ? "currentColor" : "transparent",
              color: isActive ? "#fff" : "inherit",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 500,
              opacity: isActive ? 1 : 0.7,
            }}
          >
            <span style={{ fontSize: 18, lineHeight: 1 }}>
              {tab.icon}
            </span>
            <span style={{ marginTop: 4 }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
