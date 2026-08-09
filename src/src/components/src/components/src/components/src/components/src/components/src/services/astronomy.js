import * as Astronomy from "astronomy-engine";
import { skyObjects } from "../data/skyObjects";

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

  // Solar-system objects
  objects.push(
    calculateBody(
      "Sun",
      Astronomy.Body.Sun,
      observer,
      date,
      "star"
    )
  );

  objects.push(
    calculateBody(
      "Moon",
      Astronomy.Body.Moon,
      observer,
      date,
      "moon"
    )
  );

  for (const planet of PLANETS) {
    objects.push(
      calculateBody(
        planet,
        Astronomy.Body[planet],
        observer,
        date,
        "planet"
      )
    );
  }

  // Catalogue objects
  for (const object of skyObjects) {
    const position = calculateCatalogueObject(
      object,
      observer,
      date
    );

    if (position) {
      objects.push(position);
    }
  }

  return objects;
}

function calculateBody(
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

  return {
    id: `${type}-${name.toLowerCase()}`,
    name,
    type,

    azimuth: normalizeAngle(
      horizontal.azimuth
    ),

    altitude: horizontal.altitude,

    ra: equator.ra,
    dec: equator.dec,

    magnitude: null,

    visible:
      horizontal.altitude > 0
  };
}

function calculateCatalogueObject(
  object,
  observer,
  date
) {
  if (
    typeof object.ra !== "number" ||
    typeof object.dec !== "number"
  ) {
    return null;
  }

  /*
    Catalogue RA is stored in degrees.

    Astronomy.Engine expects right ascension
    in hours for this calculation.
  */

  const raHours = object.ra / 15;

  const horizontal = Astronomy.Horizon(
    date,
    observer,
    raHours,
    object.dec,
    "normal"
  );

  return {
    ...object,

    azimuth: normalizeAngle(
      horizontal.azimuth
    ),

    altitude: horizontal.altitude,

    visible:
      horizontal.altitude > 0
  };
}

function normalizeAngle(angle) {
  return (
    ((angle % 360) + 360) % 360
  );
}
