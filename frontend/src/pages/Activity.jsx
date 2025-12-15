import { useState } from "react";
import ActivityItem from "../components/ActivityItem";
import MintModal from "../components/MintModal";

export default function Activity({ isFarcaster }) {
  const [mintingActivity, setMintingActivity] = useState(null);
  const [mintStatus, setMintStatus] = useState("idle");

  const activities = [
    {
      id: 1,
      title: "Morning Run · 5.2 km",
      date: "2025-03-12",
      xp: 120,
      status: "verified",
    },
    {
      id: 2,
      title: "Cycling · 18 km",
      date: "2025-03-10",
      xp: 180,
      status: "pending",
    },
    {
      id: 3,
      title: "Minted Reputation Badge",
      date: "2025-03-05",
      xp: 300,
      status: "minted",
    },
  ];

  if (!isFarcaster) {
    return (
      <p style={{ fontSize: 14, opacity: 0.6 }}>
        Activity tracking is available in the mini app. Open it from
        the Farcaster launcher to sync and mint your activity.
      </p>
    );
  }

  function handleMint(activity) {
    setMintingActivity(activity);
    setMintStatus("confirming");
  }

  function confirmMint() {
    setMintStatus("pending");

    // Mock async mint (replace with onchain call later)
    setTimeout(() => {
      setMintStatus("success");
      setTimeout(() => {
        setMintingActivity(null);
        setMintStatus("idle");
      }, 1200);
    }, 1500);
  }

  return (
    <div>
      <h3 style={{ marginBottom: 12 }}>Your Activity</h3>

      {activities.map((activity) => (
        <ActivityItem
          key={activity.id}
          activity={{
            ...activity,
            onMint: handleMint,
          }}
        />
      ))}

      {mintStatus === "confirming" && (
        <MintModal
          activity={mintingActivity}
          onClose={() => {
            setMintingActivity(null);
            setMintStatus("idle");
          }}
          onConfirm={confirmMint}
        />
      )}

      {mintStatus === "pending" && (
        <p style={{ fontSize: 13, marginTop: 12 }}>
          Minting activity…
        </p>
      )}

      {mintStatus === "success" && (
        <p style={{ fontSize: 13, marginTop: 12 }}>
          ✅ Activity minted successfully
        </p>
      )}
    </div>
  );
}
