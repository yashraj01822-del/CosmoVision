import React, { useMemo, useRef } from "react";

export default function SkyMap({
  objects = [],
  heading = 0,
  pitch = 0,
  labels = true,
  clouds = true,
  cloudOpacity = 0,
  onHeadingChange,
  onPitchChange
}) {
  const drag = useRef(null);

  const visibleObjects = useMemo(() => {
    return objects.filter(
      (object) => object.visible
    );
  }, [objects]);

  function getPosition(object) {
    const horizontalDifference =
      (
        (
          object.azimuth -
          heading +
          540
        ) % 360
      ) - 180;

    const left =
      50 + horizontalDifference * 0.45;

    const top =
      62 -
      object.altitude * 0.7 +
      pitch;

    return {
      left: `${left}%`,
      top: `${top}%`
    };
  }

  function pointerDown(event) {
    drag.current = {
      x: event.clientX,
      y: event.clientY,
      heading,
      pitch
    };
  }

  function pointerMove(event) {
    if (!drag.current) return;

    const dx =
      event.clientX - drag.current.x;

    const dy =
      event.clientY - drag.current.y;

    const newHeading =
      (
        drag.current.heading -
        dx * 0.25 +
        360
      ) % 360;

    const newPitch = Math.max(
      -45,
      Math.min(
        45,
        drag.current.pitch +
          dy * 0.18
      )
    );

    onHeadingChange?.(newHeading);
    onPitchChange?.(newPitch);
  }

  function pointerUp() {
    drag.current = null;
  }

  return (
    <section
      className="sky-map"
      onPointerDown={pointerDown}
      onPointerMove={pointerMove}
      onPointerUp={pointerUp}
      onPointerCancel={pointerUp}
    >

      {/* STAR BACKGROUND */}

      <div className="sky-map-stars">
        {Array.from(
          { length: 180 },
          (_, index) => (
            <span
              key={index}
              className="sky-star"
              style={{
                left: `${(
                  index * 47
                ) % 100}%`,
                top: `${(
                  index * 71
                ) % 100}%`,
                opacity:
                  0.3 +
                  ((index * 13) % 70) /
                    100
              }}
            />
          )
        )}
      </div>

      {/* CLOUD LAYER */}

      {clouds && (
        <div
          className="sky-cloud-layer"
          style={{
            opacity: cloudOpacity
          }}
        >
          <div className="sky-cloud cloud-a" />
          <div className="sky-cloud cloud-b" />
          <div className="sky-cloud cloud-c" />
        </div>
      )}

      {/* DIRECTIONS */}

      <span className="sky-direction north">
        N
      </span>

      <span className="sky-direction east">
        E
      </span>

      <span className="sky-direction south">
        S
      </span>

      <span className="sky-direction west">
        W
      </span>

      {/* OBJECTS */}

      <div className="sky-objects">
        {visibleObjects.map(
          (object) => (
            <div
              key={object.id}
              className={`sky-object ${object.type}`}
              style={getPosition(object)}
            >
              <div className="sky-object-dot" />

              {labels && (
                <span className="sky-object-label">
                  {object.name}
                </span>
              )}
            </div>
          )
        )}
      </div>

      {/* CENTER RETICLE */}

      <div className="sky-reticle">
        <span>
          {Math.round(heading)}°
        </span>
      </div>

      {/* OBJECT COUNT */}

      <div className="sky-object-count">
        {visibleObjects.length} objects visible
      </div>

    </section>
  );
    }
