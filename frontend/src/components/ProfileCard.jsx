export default function ProfileCard({ title, children }) {
  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        background: "rgba(0,0,0,0.02)",
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          opacity: 0.7,
          marginBottom: 8,
        }}
      >
        {title}
      </div>

      {children}
    </div>
  );
}
