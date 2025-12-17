import { useState, useEffect } from "react";
import ActivityItem from "../components/ActivityItem";
import MintModal from "../components/MintModal";

export default function Activity({ isFarcaster }) {
  const [mintingActivity, setMintingActivity] = useState(null);
  const [mintStatus, setMintStatus] = useState("idle");

  const [ranking, setRanking] = useState([]);
  const [rankingLoading, setRankingLoading] = useState(true);
  const [rankingError, setRankingError] = useState(null);

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

  // 🔄 Fetch club ranking
  useEffect(() => {
    async function fetchRanking() {
      try {
        const res = await fetch("/api/strava/club/ranking");
        if (!res.ok) throw new Error("Failed to load ranking");

        const data = await res.json();
        setRanking(data.ranking || []);
      } catch (err) {
        setRankingError(err.message);
      } finally {
        setRankingLoading(false);
      }
    }

    fetchRanking();
  }, []);

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
      {/* ================= YOUR ACTIVITY ================= */}
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

      {/* ================= CLUB RANKING ================= */}
      <hr style={{ margin: "24px 0", opacity: 0.2 }} />

      <h3 style={{ marginBottom: 12 }}>🏆 Club Ranking</h3>

      {rankingLoading && (
        <p style={{ fontSize: 13, opacity: 0.6 }}>
          Loading ranking…
        </p>
      )}

      {rankingError && (
        <p style={{ fontSize: 13, color: "red" }}>
          Error loading ranking: {rankingError}
        </p>
      )}

      {!rankingLoading && ranking.length === 0 && (
        <p style={{ fontSize: 13, opacity: 0.6 }}>
          No ranking data available.
        </p>
      )}

      {ranking.map((row) => (
        <div
          key={row.position}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "6px 0",
            fontSize: 14,
            borderBottom: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <span>
            #{row.position} · {row.athlete}
          </span>
          <strong>{row.xp} XP</strong>
        </div>
      ))}
    </div>
  );
}
