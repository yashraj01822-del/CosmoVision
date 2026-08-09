import React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#02031d",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontFamily: "system-ui",
        textAlign: "center",
      }}
    >
      <h1>🌌 Cosmo Vision</h1>
      <p>React is working correctly.</p>
      <p>Now we can rebuild the astronomy system safely.</p>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <App />
);
