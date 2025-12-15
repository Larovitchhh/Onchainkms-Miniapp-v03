import Button from "./Button";

export default function MintModal({ activity, onClose, onConfirm }) {
  if (!activity) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          padding: 16,
          width: "90%",
          maxWidth: 360,
        }}
      >
        <h3 style={{ marginBottom: 8 }}>Mint activity</h3>

        <p style={{ fontSize: 14, marginBottom: 12 }}>
          You are about to mint:
        </p>

        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 6,
            padding: 8,
            marginBottom: 16,
          }}
        >
          <div style={{ fontWeight: 600 }}>
            {activity.title}
          </div>
          <div style={{ fontSize: 12, opacity: 0.6 }}>
            +{activity.xp} XP
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <Button onClick={onClose} disabled={false}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            Confirm mint
          </Button>
        </div>
      </div>
    </div>
  );
}
