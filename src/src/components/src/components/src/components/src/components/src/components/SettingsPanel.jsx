import React from "react";

export default function SettingsPanel({
  open,
  clouds,
  labels,
  tracking,
  objectCount,
  location,
  onToggleClouds,
  onToggleLabels,
  onEnableMotion,
  onClose
}) {
  if (!open) {
    return null;
  }

  return (
    <aside className="settings-panel">

      <div className="settings-header">
        <div>
          <small>CONTROL CENTER</small>
          <h2>Cosmo Vision</h2>
        </div>

        <button
          onClick={onClose}
          aria-label="Close settings"
        >
          ×
        </button>
      </div>

      <div className="settings-section">

        <label className="setting-row">
          <span>
            <strong>Cloud overlay</strong>
            <small>
              Show weather clouds on the sky
            </small>
          </span>

          <input
            type="checkbox"
            checked={clouds}
            onChange={(event) =>
              onToggleClouds(
                event.target.checked
              )
            }
          />
        </label>

        <label className="setting-row">
          <span>
            <strong>Object labels</strong>
            <small>
              Show celestial object names
            </small>
          </span>

          <input
            type="checkbox"
            checked={labels}
            onChange={(event) =>
              onToggleLabels(
                event.target.checked
              )
            }
          />
        </label>

      </div>

      <div className="settings-section">

        <button
          className="motion-button"
          onClick={onEnableMotion}
        >
          {tracking
            ? "✓ Motion Tracking Enabled"
            : "✦ Enable Phone Motion"}
        </button>

      </div>

      <div className="settings-stats">

        <div>
          <span>OBJECTS VISIBLE</span>
          <strong>
            {objectCount}
          </strong>
        </div>

        <div>
          <span>LATITUDE</span>
          <strong>
            {location
              ? location.latitude.toFixed(3)
              : "--"}
          </strong>
        </div>

        <div>
          <span>LONGITUDE</span>
          <strong>
            {location
              ? location.longitude.toFixed(3)
              : "--"}
          </strong>
        </div>

      </div>

      <p className="settings-note">
        Cosmo Vision combines astronomical
        calculations with live weather data
        to help you explore the night sky.
      </p>

    </aside>
  );
}
