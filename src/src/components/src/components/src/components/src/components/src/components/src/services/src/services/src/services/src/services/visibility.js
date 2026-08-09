export function getCloudOpacity(cloudCover = 0) {
  const value = Number(cloudCover);

  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(
    0,
    Math.min(1, value / 100)
  );
}

export function calculateSkyClarity({
  cloudCover = 0,
  visibility = 0,
  humidity = 0,
  precipitationProbability = 0,
}) {
  const cloudScore = 100 - cloudCover;

  const visibilityKm =
    visibility > 0
      ? visibility / 1000
      : 10;

  const visibilityScore =
    Math.min(100, visibilityKm / 10 * 100);

  const humidityPenalty =
    Math.max(0, humidity - 70);

  const precipitationPenalty =
    precipitationProbability * 0.5;

  const clarity =
    cloudScore * 0.55 +
    visibilityScore * 0.30 +
    (100 - humidityPenalty * 2) * 0.10 +
    (100 - precipitationPenalty) * 0.05;

  return Math.max(
    0,
    Math.min(100, Math.round(clarity))
  );
}

export function getClarityLabel(clarity = 0) {
  if (clarity >= 80) return "EXCELLENT";
  if (clarity >= 60) return "GOOD";
  if (clarity >= 40) return "FAIR";
  if (clarity >= 20) return "POOR";
  return "VERY POOR";
}
