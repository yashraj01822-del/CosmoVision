import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import SkyMap from "./components/SkyMap";
import TopBar from "./components/TopBar";
import WeatherPanel from "./components/WeatherPanel";
import ObjectPanel from "./components/ObjectPanel";
import SettingsPanel from "./components/SettingsPanel";

import { getSkyObjects } from "./services/astronomy";
import { getWeather } from "./services/weather";
import { getUserLocation } from "./services/location";

import {
  calculateSkyClarity,
  getCloudOpacity,
  getClarityLabel
} from "./services/visibility";

import "./styles.css";

function App() {
  const [location, setLocation] = useState(null);
  const [objects, setObjects] = useState([]);
  const [weather, setWeather] = useState(null);

  const [heading, setHeading] = useState(0);
  const [pitch, setPitch] = useState(0);

  const [tracking, setTracking] = useState(false);
  const [labels, setLabels] = useState(true);
  const [clouds, setClouds] = useState(true);

  const [settingsOpen, setSettingsOpen] =
    useState(false);

  const [selectedObject, setSelectedObject] =
    useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // -----------------------------------------
  // LOAD LOCATION + ASTRONOMY + WEATHER
  // -----------------------------------------

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const userLocation =
          await getUserLocation();

        setLocation(userLocation);

        const skyObjects =
          getSkyObjects(
            userLocation.latitude,
            userLocation.longitude,
            new Date()
          );

        setObjects(skyObjects);

        const weatherData =
          await getWeather(
            userLocation.latitude,
            userLocation.longitude
          );

        setWeather(weatherData);
      } catch (err) {
        console.error(err);

        setError(
          "Unable to load your location or sky data."
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // -----------------------------------------
  // UPDATE SKY POSITIONS
  // -----------------------------------------

  useEffect(() => {
    if (!location) return;

    function updateSky() {
      try {
        const updatedObjects =
          getSkyObjects(
            location.latitude,
            location.longitude,
            new Date()
          );

        setObjects(updatedObjects);
      } catch (err) {
        console.error(
          "Sky update failed:",
          err
        );
      }
    }

    updateSky();

    const timer = setInterval(
      updateSky,
      60000
    );

    return () => {
      clearInterval(timer);
    };
  }, [location]);

  // -----------------------------------------
  // PHONE MOTION
  // -----------------------------------------

  useEffect(() => {
    if (!tracking) return;

    function handleOrientation(event) {
      if (
        typeof event.alpha ===
        "number"
      ) {
        setHeading(event.alpha);
      }

      if (
        typeof event.beta ===
        "number"
      ) {
        const newPitch =
          event.beta - 45;

        setPitch(
          Math.max(
            -45,
            Math.min(
              45,
              newPitch
            )
          )
        );
      }
    }

    window.addEventListener(
      "deviceorientation",
      handleOrientation,
      true
    );

    return () => {
      window.removeEventListener(
        "deviceorientation",
        handleOrientation,
        true
      );
    };
  }, [tracking]);

  // -----------------------------------------
  // ENABLE MOTION
  // -----------------------------------------

  async function enableMotion() {
    try {
      if (
        typeof DeviceOrientationEvent !==
          "undefined" &&
        typeof DeviceOrientationEvent
          .requestPermission ===
          "function"
      ) {
        const permission =
          await DeviceOrientationEvent
            .requestPermission();

        if (
          permission !== "granted"
        ) {
          setError(
            "Motion permission was not granted."
          );

          return;
        }
      }

      setError("");
      setTracking(true);
    } catch (err) {
      console.error(err);

      setTracking(true);
    }
  }

  // -----------------------------------------
  // WEATHER VALUES
  // -----------------------------------------

  const current =
    weather?.current;

  const cloudCover =
    current?.cloud_cover ?? 0;

  const humidity =
    current?.relative_humidity_2m ?? 0;

  const visibility =
    weather?.hourly
      ?.visibility?.[0] ?? 0;

  const precipitation =
    weather?.hourly
      ?.precipitation_probability?.[0] ??
    0;

  const cloudOpacity =
    getCloudOpacity(
      cloudCover
    );

  const clarity =
    calculateSkyClarity({
      cloudCover,
      visibility,
      humidity,
      precipitationProbability:
        precipitation
    });

  const clarityLabel =
    getClarityLabel(
      clarity
    );

  // -----------------------------------------
  // RENDER
  // -----------------------------------------

  return (
    <main className="app">

      <SkyMap
        objects={objects}
        heading={heading}
        pitch={pitch}
        labels={labels}
        clouds={clouds}
        cloudOpacity={cloudOpacity}
        onHeadingChange={
          setHeading
        }
        onPitchChange={
          setPitch
        }
        onObjectSelect={
          setSelectedObject
        }
      />

      <TopBar
        heading={heading}
        cloudCover={cloudCover}
        onEnableMotion={
          enableMotion
        }
      />

      <WeatherPanel
        weather={weather}
        clarity={clarity}
        clarityLabel={
          clarityLabel
        }
        cloudOpacity={
          cloudOpacity
        }
      />

      <ObjectPanel
        object={selectedObject}
        onClose={() =>
          setSelectedObject(null)
        }
      />

      <SettingsPanel
        open={settingsOpen}
        clouds={clouds}
        labels={labels}
        tracking={tracking}
        objectCount={
          objects.filter(
            (object) =>
              object.visible
          ).length
        }
        location={location}
        onToggleClouds={
          setClouds
        }
        onToggleLabels={
          setLabels
        }
        onEnableMotion={
          enableMotion
        }
        onClose={() =>
          setSettingsOpen(false)
        }
      />

      <button
        className="settings-button"
        onClick={() =>
          setSettingsOpen(
            (value) => !value
          )
        }
      >
        ☰
      </button>

      {loading && (
        <div className="loading">
          <div className="loader" />
          <span>
            Calculating your sky...
          </span>
        </div>
      )}

      {error && (
        <div className="error">
          {error}
        </div>
      )}

    </main>
  );
}

const rootElement =
  document.getElementById(
    "root"
  );

if (!rootElement) {
  throw new Error(
    "Root element was not found."
  );
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
