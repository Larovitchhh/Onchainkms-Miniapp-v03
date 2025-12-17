import { useState, useEffect } from "react";
import TabBar from "./components/TabBar";
import { useFarcasterContext } from "./farcaster/useFarcasterContext";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Activity from "./pages/Activity";
import Mint from "./pages/Mint";

export default function App() {
  const { loading, isFarcaster, username } = useFarcasterContext();
  const [tab, setTab] = useState("Home");

  const [dark, setDark] = useState(false);

  /**
   * 🔐 AUTENTICACIÓN MINIAPP (CORRECTA)
   * El FID se lee directamente del contexto global de Farcaster
   */
  useEffect(() => {
    if (loading) return;
    if (!isFarcaster) return;

    const fid = window?.Farcaster?.context?.user?.fid;

    if (!fid) {
      console.warn("FID not available in Farcaster context");
      return;
    }

    if (localStorage.getItem("token")) return;

    console.log("AUTH → sending fid to backend:", fid);

    fetch("/api/auth/farcaster", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fid }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          console.log("SESSION OK", data.user);
        } else {
          console.error("Auth failed", data);
        }
      })
      .catch((err) => {
        console.error("Backend auth error", err);
      });
  }, [loading, isFarcaster]);

  if (loading) {
    return <div style={{ padding: 16 }}>Loading…</div>;
  }

  return (
    <div
      style={{
        padding: 16,
        fontFamily: "system-ui",
        maxWidth: 520,
        margin: "0 auto",
        background: dark ? "#0f172a" : "#ffffff",
        color: dark ? "#e5e7eb" : "#111827",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ marginBottom: 4 }}>OnchainKMS</h1>

      <button
        onClick={() => setDark(!dark)}
        style={{
          fontSize: 12,
          padding: "4px 8px",
          borderRadius: 6,
          border: "1px solid",
          background: "none",
          color: "inherit",
          marginBottom: 12,
          cursor: "pointer",
          opacity: 0.7,
        }}
      >
        {dark ? "Light mode" : "Dark mode"}
      </button>

      <TabBar active={tab} onChange={setTab} />

      {tab === "Home" && (
        <Home isFarcaster={isFarcaster} username={username} />
      )}

      {tab === "Profile" && (
        <Profile isFarcaster={isFarcaster} username={username} />
      )}

      {tab === "Activity" && <Activity isFarcaster={isFarcaster} />}

      {tab === "Mint" && <Mint isFarcaster={isFarcaster} />}
    </div>
  );
}
