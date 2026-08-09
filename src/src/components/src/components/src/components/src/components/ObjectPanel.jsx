import React from "react";

export default function ObjectPanel({
  object,
  onClose
}) {
  if (!object) {
    return null;
  }

  return (
    <aside className="object-panel">

      <div className="object-panel-header">
        <div>
          <small>CELESTIAL OBJECT</small>
          <h2>{object.name}</h2>
        </div>

        <button
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      </div>

      <div className="object-type">
        {object.type || "Unknown"}
      </div>

      <div className="object-details">

        <div>
          <span>MAGNITUDE</span>
          <strong>
            {typeof object.magnitude === "number"
              ? object.magnitude.toFixed(2)
              : "--"}
          </strong>
        </div>

        <div>
          <span>ALTITUDE</span>
          <strong>
            {typeof object.altitude === "number"
              ? `${object.altitude.toFixed(1)}°`
              : "--"}
          </strong>
        </div>

        <div>
          <span>AZIMUTH</span>
          <strong>
            {typeof object.azimuth === "number"
              ? `${object.azimuth.toFixed(1)}°`
              : "--"}
          </strong>
        </div>

        <div>
          <span>RIGHT ASCENSION</span>
          <strong>
            {typeof object.ra === "number"
              ? `${object.ra.toFixed(2)}°`
              : "--"}
          </strong>
        </div>

        <div>
          <span>DECLINATION</span>
          <strong>
            {typeof object.dec === "number"
              ? `${object.dec.toFixed(2)}°`
              : "--"}
          </strong>
        </div>

        <div>
          <span>VISIBILITY</span>
          <strong>
            {object.visible
              ? "VISIBLE"
              : "BELOW HORIZON"}
          </strong>
        </div>

      </div>

    </aside>
  );
}
