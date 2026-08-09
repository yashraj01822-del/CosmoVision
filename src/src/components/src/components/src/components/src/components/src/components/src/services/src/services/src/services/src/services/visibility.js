export function calculateSkyClarity({
  cloudCover = 0,
  visibility = 10000,
  humidity = 0,
  precipitationProbability = 0
}) {
  const cloudScore =
    Math.max(0, 100 - cloudCover);

  const visibilityKm =
    visibility / 1000;

  const visibilityScore =
    Math.min(
      100,
      Math.max(
        0,
        (visibilityKm / 20) * 100
      )
    );

  const humidityPenalty =
    Math.max(0, humidity - 70) * 0.5;

  const precipitationPenalty =
    precipitationProbability * 0.4;

  const score =
    cloudScore * 0.5 +
    visibilityScore * 0.5 -
    humidityPenalty -
    precipitationPenalty;

  return Math.round(
    Math.max(
      0,
      Math.min(100, score)
    )
  );
}

export function getCloudOpacity(
  cloudCover = 0
) {
  return Math.max(
    0.05,
    Math.min(
      0.95,
      cloudCover / 100
    )
  );
}

export function getClarityLabel(
  clarity
) {
  if (clarity >= 80) {
    return "Excellent";
  }

  if (clarity >= 60) {
    return "Good";
  }

  if (clarity >= 40) {
    return "Moderate";
  }

  if (clarity >= 20) {
    return "Poor";
  }

  return "Very Poor";
}
