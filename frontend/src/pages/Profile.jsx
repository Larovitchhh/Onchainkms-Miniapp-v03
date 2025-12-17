import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import StatsCard from "../components/StatsCard";
import Button from "../components/Button";

export default function Profile({ isFarcaster, username }) {
  const fid =
    isFarcaster && window?.Farcaster?.context?.user?.fid
      ? String(window.Farcaster.context.user.fid)
      : null;

  const profile = {
    username: username || "guest",
    fid,
    avatar: "/logo.png",
    level: 3,
    xp: 1240,
    rank: 128,
    wallet: isFarcaster ? "0x1234...abcd" : null,
  };

  const [athletes, setAthletes] = useState([]);
  const [selectedAthlete, setSelectedAthlete] = useState("");
  const [linkedAthlete, setLinkedAthlete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // 🔄 Load ranking athletes
  useEffect(() => {
    if (!isFarcaster) return;

    fetch("/api/strava/club/ranking")
      .then((res) => res.json())
      .then((data) => {
        const names = (data.ranking || []).map(
          (r) => r.athlete
        );
        setAthletes(names);
      })
      .catch(() => {});
  }, [isFarcaster]);

  // 🔗 Load existing link
  useEffect(() => {
    if (!fid) return;

    fetch(`/api/strava/link/${fid}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.athlete) {
          setLinkedAthlete(data.athlete);
        }
      })
      .catch(() => {});
  }, [fid]);

  function linkStrava() {
    if (!selectedAthlete || !fid) return;

    setLoading(true);
    setStatus("");

    fetch("/api/strava/link/link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fid,
        athlete: selectedAthlete,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setLinkedAthlete(selectedAthlete);
        setStatus("✅ Strava linked successfully");
      })
      .catch(() => {
        setStatus("❌ Error linking Strava");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      {/* Identity */}
      <ProfileCard title="Identity">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src={profile.avatar}
            alt="avatar"
            width={48}
            height={48}
            style={{ borderRadius: "50%" }}
          />

          <div>
            <div style={{ fontWeight: 600 }}>
              @{profile.username}
            </div>

            {profile.fid && (
              <div style={{ fontSize: 12, opacity: 0.6 }}>
                FID #{profile.fid}
              </div>
            )}
          </div>
        </div>
      </ProfileCard>

      {/* Reputation */}
      <ProfileCard title="Reputation">
        <div style={{ display: "flex", gap: 12 }}>
          <StatsCard label="Level" value={profile.level} />
          <StatsCard label="XP" value={profile.xp} />
          <StatsCard label="Rank" value={`#${profile.rank}`} />
        </div>
      </ProfileCard>

      {/* Wallet */}
      <ProfileCard title="Wallet">
        {profile.wallet ? (
          <div>
            <div style={{ fontSize: 14 }}>
              {profile.wallet}
            </div>
            <div style={{ fontSize: 12, opacity: 0.6 }}>
              Connected
            </div>
          </div>
        ) : (
          <div style={{ fontSize: 14, opacity: 0.6 }}>
            Wallet connection available in the mini app.
          </div>
        )}
      </ProfileCard>

      {/* Strava */}
      <ProfileCard title="Strava">
        {!isFarcaster && (
          <p style={{ fontSize: 14, opacity: 0.6 }}>
            Strava connection is available in the mini app.
          </p>
        )}

        {isFarcaster && (
          <>
            {linkedAthlete ? (
              <p style={{ fontSize: 14 }}>
                ✅ Linked to <strong>{linkedAthlete}</strong>
              </p>
            ) : (
              <>
                <p style={{ fontSize: 14, marginBottom: 8 }}>
                  Link your Strava athlete from the club:
                </p>

                <select
                  value={selectedAthlete}
                  onChange={(e) =>
                    setSelectedAthlete(e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: 8,
                    marginBottom: 8,
                  }}
                >
                  <option value="">
                    Select your Strava name
                  </option>
                  {athletes.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>

                <Button
                  onClick={linkStrava}
                  disabled={!selectedAthlete || loading}
                >
                  {loading ? "Linking…" : "Link my Strava"}
                </Button>

                {status && (
                  <p
                    style={{
                      fontSize: 12,
                      marginTop: 8,
                      opacity: 0.8,
                    }}
                  >
                    {status}
                  </p>
                )}
              </>
            )}
          </>
        )}
      </ProfileCard>

      {/* Status */}
      {!isFarcaster && (
        <p style={{ fontSize: 13, opacity: 0.6 }}>
          This is the embed/web view. Open the mini app from the
          Farcaster launcher to manage your full profile.
        </p>
      )}
    </div>
  );
}
