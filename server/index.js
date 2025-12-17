require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const stravaRoutes = require("./src/routes/strava.routes");
const stravaRankingRoutes = require("./src/routes/stravaRanking.routes");
const stravaLinkRoutes = require("./src/routes/stravaLink.routes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/strava", stravaRoutes);
app.use("/api/strava/club", stravaRankingRoutes);
app.use("/api/strava/link", stravaLinkRoutes);

/**
 * Healthcheck
 */
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

/**
 * ✅ GET /api/frame
 * IMPORTANTE:
 * El validador de Farcaster hace GET aquí.
 */
app.get("/api/frame", (req, res) => {
  return res.status(200).json({
    status: "OK",
    message: "Frame endpoint exists. Send POST for interactions.",
  });
});

/**
 * POST /api/frame
 * Placeholder para lógica futura
 */
app.post("/api/frame", (req, res) => {
  console.log("Frame POST received:", req.body);

  return res.status(200).json({
    status: "OK",
    message: "Frame POST received (not implemented yet)",
  });
});

/**
 * 🔐 POST /api/auth/farcaster
 * AUTENTICACIÓN REAL PARA MINIAPP FARCASTER
 *
 * ⚠️ NO firmas
 * ⚠️ NO auth-client
 * ⚠️ NO SDK extra
 *
 * El FID que ya viene del frontend ES la identidad
 */
app.post("/api/auth/farcaster", (req, res) => {
  const { fid } = req.body;

  if (!fid) {
    return res.status(400).json({
      error: "Missing fid",
    });
  }

  // Crear sesión interna (JWT)
  const token = jwt.sign(
    { fid },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return res.json({
    ok: true,
    token,
    user: { fid },
  });
});

/**
 * Ejemplo: endpoint /api/me
 * (más adelante se protegerá con JWT)
 */
app.post("/api/me", (req, res) => {
  const { fid } = req.body;

  if (!fid) {
    return res.status(400).json({
      error: "Missing fid",
    });
  }

  return res.json({
    fid,
    level: 1,
    xp: 0,
    status: "ok",
  });
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`OnchainKMS backend listening on http://127.0.0.1:${PORT}`);
});
