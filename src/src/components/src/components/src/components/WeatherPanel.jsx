import React from "react";

export default function WeatherPanel({
  weather,
  clarity = 0,
  clarityLabel = "Unknown",
  cloudOpacity = 0
}) {
  const current = weather?.current;

  const cloudCover =
    current?.cloud_cover ?? 0;

  const temperature =
    current?.temperature_2m ?? "--";

  const humidity =
    current?.relative_humidity_2m ?? "--";

  const visibility =
    weather?.hourly?.visibility?.[0];

  const visibilityKm =
    typeof visibility === "number"
      ? (visibility / 1000).toFixed(1)
      : "--";

  return (
    <aside className="weather-panel">

      <div className="weather-header">
        <span>SKY CONDITIONS</span>
        <strong>{clarityLabel}</strong>
      </div>

      <div className="weather-grid">

        <div>
          <small>CLOUDS</small>
          <strong>
            {Math.round(cloudCover)}%
          </strong>
        </div>

        <div>
          <small>OPACITY</small>
          <strong>
            {Math.round(
              cloudOpacity * 100
            )}%
          </strong>
        </div>

        <div>
          <small>CLARITY</small>
          <strong>
            {Math.round(clarity)}/100
          </strong>
        </div>

        <div>
          <small>VISIBILITY</small>
          <strong>
            {visibilityKm} km
          </strong>
        </div>

        <div>
          <small>TEMP</small>
          <strong>
            {temperature}°C
          </strong>
        </div>

        <div>
          <small>HUMIDITY</small>
          <strong>
            {humidity}%
          </strong>
        </div>

      </div>

      <div className="cloud-meter">

        <div className="cloud-meter-label">
          <span>Cloud opacity</span>
          <strong>
            {Math.round(
              cloudOpacity * 100
            )}%
          </strong>
        </div>

        <div className="cloud-meter-track">
          <div
            className="cloud-meter-fill"
            style={{
              width: `${Math.max(
                0,
                Math.min(
                  100,
                  cloudOpacity * 100
                )
              )}%`
            }}
          />
        </div>

      </div>

    </aside>
  );
}
