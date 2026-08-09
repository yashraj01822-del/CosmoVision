import * as Astronomy from "astronomy-engine";

/*
  Cosmo Vision Astronomy Engine

  Handles:
  - Sun
  - Moon
  - Mercury
  - Venus
  - Mars
  - Jupiter
  - Saturn
  - Uranus
  - Neptune
*/

const PLANETS = [
  "Mercury",
  "Venus",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune"
];

export function getSkyObjects(
  latitude,
  longitude,
  date = new Date()
) {
  const observer = new Astronomy.Observer(
    latitude,
    longitude,
    0
  );

  const objects = [];

  // Sun
  objects.push(
    calculateObject(
      "Sun",
      Astronomy.Body.Sun,
      observer,
      date,
      "star"
    )
  );

  // Moon
  objects.push(
    calculateObject(
      "Moon",
      Astronomy.Body.Moon,
      observer,
      date,
      "moon"
    )
  );

  // Planets
  for (const planet of PLANETS) {
    objects.push(
      calculateObject(
        planet,
        Astronomy.Body[planet],
        observer,
        date,
        "planet"
      )
    );
  }

  return objects;
}

function calculateObject(
  name,
  body,
  observer,
  date,
  type
) {
  const equator = Astronomy.Equator(
    body,
    date,
    observer,
    true,
    true
  );

  const horizontal = Astronomy.Horizon(
    date,
    observer,
    equator.ra,
    equator.dec,
    "normal"
  );

  const altitude = horizontal.altitude;

  return {
    id: `${type}-${name.toLowerCase()}`,
    name,
    type,

    azimuth: normalizeAngle(
      horizontal.azimuth
    ),

    altitude,

    rightAscension: equator.ra,

    declination: equator.dec,

    visible: altitude > 0
  };
}

function normalizeAngle(angle) {
  return (
    ((angle % 360) + 360) % 360
  );
    }
