import ProfileCard from "../components/ProfileCard";
import StatsCard from "../components/StatsCard";
import Button from "../components/Button";

export default function Profile({ isFarcaster, username }) {
  // Mock profile data
  const profile = {
    username: username || "guest",
    fid: isFarcaster ? "12345" : null,
    avatar: "/logo.png",
    level: 3,
    xp: 1240,
    rank: 128,
    wallet: isFarcaster ? "0x1234...abcd" : null,
  };

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
            <p style={{ fontSize: 14, marginBottom: 8 }}>
              Connect your Strava account to sync activities.
            </p>
            <Button onClick={() => {}}>
              Connect Strava
            </Button>
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
