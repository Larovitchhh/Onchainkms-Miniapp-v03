import StatsCard from "../components/StatsCard";

export default function Home({ isFarcaster, username }) {
  // Mock data (luego vendrá del backend)
  const stats = {
    level: 3,
    xp: 1240,
    nextLevelXp: 2000,
    rank: 128,
  };

  const progress =
    Math.round((stats.xp / stats.nextLevelXp) * 100);

  return (
    <div>
      <p>
        {isFarcaster
          ? `Welcome @${username}`
          : "Welcome to OnchainKMS"}
      </p>

      <p style={{ opacity: 0.7 }}>
        Track activity, build reputation, and mint progress on Farcaster.
      </p>

      {/* Stats */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginTop: 16,
          marginBottom: 16,
        }}
      >
        <StatsCard label="Level" value={stats.level} />
        <StatsCard label="XP" value={stats.xp} />
        <StatsCard label="Rank" value={`#${stats.rank}`} />
      </div>

      {/* Progress */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, opacity: 0.6 }}>
          Next level progress
        </div>
        <div
          style={{
            height: 8,
            background: "#e5e7eb",
            borderRadius: 4,
            overflow: "hidden",
            marginTop: 4,
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "#000",
            }}
          />
        </div>
        <div style={{ fontSize: 11, opacity: 0.5, marginTop: 4 }}>
          {stats.xp} / {stats.nextLevelXp} XP
        </div>
      </div>

      {!isFarcaster && (
        <p style={{ fontSize: 14, opacity: 0.6 }}>
          You are viewing the embed version. Open the mini app from the
          Farcaster launcher for full access.
        </p>
      )}
    </div>
  );
}
