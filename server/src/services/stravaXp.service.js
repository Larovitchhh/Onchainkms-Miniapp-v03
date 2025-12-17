function normalizeActivity(activity) {
  const kms = (activity.distance || 0) / 1000;
  const time_min = (activity.moving_time || 0) / 60;
  const elevation_m = activity.total_elevation_gain || 0;

  const sport = activity.sport_type || activity.type;

  let category = "other";

  // 🏃 Deportes a pie
  if (["Run", "TrailRun", "Walk", "Hike"].includes(sport)) {
    category = "foot";

  // 🚵 MTB / Gravel
  } else if (["MountainBikeRide", "GravelRide"].includes(sport)) {
    category = "mtb";

  // 🚴 Carretera
  } else if (["Ride", "VirtualRide"].includes(sport)) {
    category = "road";

  // 🏊 Natación
  } else if (["Swim"].includes(sport)) {
    category = "swim";
  }

  return {
    athlete: `${activity.athlete.firstname} ${activity.athlete.lastname?.charAt(0) || ""}.`,
    category,
    kms,
    time_min,
    elevation_m
  };
}

function calculateXp(activity) {
  let baseXp = 0;

  switch (activity.category) {
    case "foot":
      baseXp = activity.kms * 5;
      break;
    case "mtb":
      baseXp = activity.kms * 2;
      break;
    case "road":
      baseXp = activity.kms * 1;
      break;
    case "swim":
      baseXp = activity.kms * 10;
      break;
    default:
      baseXp = 0;
  }

  const elevationXp = Math.floor(activity.elevation_m / 100) * 5;
  const timeXp = Math.floor(activity.time_min / 60) * 5;

  return Math.floor(baseXp + elevationXp + timeXp);
}

module.exports = {
  normalizeActivity,
  calculateXp
};
