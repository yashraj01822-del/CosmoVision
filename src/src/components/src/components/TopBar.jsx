import React from "react";

export default function TopBar({
  heading = 0,
  cloudCover = 0,
  onEnableMotion
}) {
  return (
    <header className="top-bar">

      <button
        className="compass-button"
        onClick={onEnableMotion}
        title="Enable phone motion"
      >
        {Math.round(heading)
          .toString()
          .padStart(3, "0")}
        °
      </button>

      <div className="brand">
        <strong>Cosmo Vision</strong>
        <span>LIVE SKY EXPLORER</span>
      </div>

      <div className="cloud-status">
        <span>☁</span>
        <strong>
          {Math.round(cloudCover)}%
        </strong>
      </div>

    </header>
  );
}
