const express = require("express");

// 👉 NUEVO: importar rutas Strava
const stravaRoutes = require("./routes/strava.routes");

const app = express();
const PORT = 3000;

app.use(express.json());

/**
 * Healthcheck
 */
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

/**
 * Perfil mínimo (mock)
 * Más adelante se sustituirá por datos reales usando fid
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

/**
 * 👉 NUEVO: rutas Strava (scaffolding)
 * NO hay OAuth todavía
 * NO hay lógica todavía
 */
app.use("/api/strava", stravaRoutes);

/**
 * Start server
 */
app.listen(PORT, "127.0.0.1", () => {
  console.log(
    `OnchainKMS backend listening on http://127.0.0.1:${PORT}`
  );
});
