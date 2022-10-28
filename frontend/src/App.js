import React, { useState } from "react";

import esriConfig from '@arcgis/core/config.js';

import { AppContext } from "./state/context";
import MapComponent from "./components/Map";
import RouteWidget from "./components/RouteWidget";
import "./App.css";

function App() {
  // Opprett store som sendes rundt til ulike komponenter
  esriConfig.apiKey = "AAPK52519f141ec04565b33944a7da4bc90fnViwerekXzgz0Xmo2l0frkfDum-JLaO1qlOfNgp6QFA4tUSOS_ZEur7zjsuqLFJu";
  const [mapView, setMapView] = useState(null);
  const [featureLayer, setFeatureLayer] = useState(null);
  const [point, setPoint] = useState({
    type: "point",
    latitude: 63.4305,
    longitude: 10.4500
  });

  const store = {
    mapView: { value: mapView, set: setMapView },
    featureLayer: { value: featureLayer, set: setFeatureLayer },
    point: { value: point, set: setPoint },
  }

  return (
    <AppContext.Provider value={store}>
      <div style={{ height: "100%", width: "100%" }}>
        <MapComponent />
        <RouteWidget />
      </div>
    </AppContext.Provider>
  );
}

export default App;
