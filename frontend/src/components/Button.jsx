export default function Button({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        border: "none",
        borderRadius: 6,
        padding: "8px 12px",
        background: disabled ? "#9ca3af" : "#000",
        color: "#fff",
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: 14,
        fontWeight: 500,
      }}
    >
      {children}
    </button>
  );
}
