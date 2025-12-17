import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";

export default function Home({ isFarcaster, username }) {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/strava/club/ranking")
      .then((res) => res.json())
      .then((data) => {
        setRanking(data.ranking || []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h3 style={{ marginBottom: 12 }}>
        Welcome{username ? `, @${username}` : ""}
      </h3>

      <ProfileCard title="🏆 Club Ranking">
        {loading && (
          <p style={{ fontSize: 14, opacity: 0.6 }}>
            Loading ranking…
          </p>
        )}

        {!loading && ranking.length === 0 && (
          <p style={{ fontSize: 14, opacity: 0.6 }}>
            No ranking data yet.
          </p>
        )}

        {!loading &&
          ranking.slice(0, 10).map((r) => (
            <div
              key={r.position}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "6px 0",
                borderBottom: "1px solid #e5e7eb",
                fontSize: 14,
              }}
            >
              <div>
                <strong>
                  #{r.position} {r.athlete}
                </strong>
                <div style={{ fontSize: 12, opacity: 0.6 }}>
                  {r.activities} activities · {r.kms.toFixed(1)} km
                </div>
              </div>

              <div style={{ fontWeight: 600 }}>
                {r.xp} XP
              </div>
            </div>
          ))}
      </ProfileCard>
    </div>
  );
}
