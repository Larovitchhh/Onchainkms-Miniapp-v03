import { useEffect, useState } from "react";

export default function Ranking() {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRanking() {
      try {
        const res = await fetch("/api/strava/club/ranking");
        if (!res.ok) throw new Error("Failed to fetch ranking");

        const data = await res.json();
        setRanking(data.ranking || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRanking();
  }, []);

  if (loading) return <p>Loading ranking…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>🏆 Club Ranking (last activities)</h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Athlete</th>
            <th>Kms</th>
            <th>Time (min)</th>
            <th>Elevation (m)</th>
            <th>Activities</th>
            <th>XP</th>
          </tr>
        </thead>

        <tbody>
          {ranking.map(row => (
            <tr key={row.position}>
              <td>{row.position}</td>
              <td>{row.athlete}</td>
              <td>{row.kms}</td>
              <td>{row.time_min}</td>
              <td>{row.elevation_m}</td>
              <td>{row.activities}</td>
              <td><strong>{row.xp}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
