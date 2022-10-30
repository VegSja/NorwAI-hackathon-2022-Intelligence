import React, { useEffect, useState } from "react";

import esriConfig from '@arcgis/core/config.js';

import { AppContext } from "./state/context";
import MapComponent from "./components/Map";
import Papa, { parse } from "papaparse";
import "./App.css";
import RouteWidget from "./components/RouteWidget";
import Legend from "./components/Legend";

const mapper = {
  "rrl": "corr_rain",
  "qsw": "corr_snowmelt",
  "qtt": "corr_snowmelt_and_rain",
  "tm": "corr_temp",
  "rr": "corr_ppt",
  "gwb_gwt": "corr_soilwater"
}


function App() {
  const [polyData, setPolyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://127.0.0.1:3001/correlations.csv', {
      headers : { 
        'content-type': 'text/csv;charset=UTF-8'
        }
      })
      .catch(function() {
        console.log("error");
      }); 
    

    const data = await response.text();

    const csv = Papa.parse(data, { header: true });
    const parsedData = csv?.data;

    setPolyData(parsedData);
    }

    fetchData()
      .catch(console.error)

  }, []) 



  // Opprett store som sendes rundt til ulike komponenter
  esriConfig.apiKey = "AAPK52519f141ec04565b33944a7da4bc90fnViwerekXzgz0Xmo2l0frkfDum-JLaO1qlOfNgp6QFA4tUSOS_ZEur7zjsuqLFJu";
  const [mapView, setMapView] = useState(null);
  const [featureLayer, setFeatureLayer] = useState(null);
  const [selectedMeasure, setSelectedMeasure] = useState("qsw");
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

  console.log(polyData)

  return (
    <AppContext.Provider value={store}>
      <div style={{ height: "100%", width: "100%" }}>
        <MapComponent 
          polygons={polyData} 
          selected={mapper[selectedMeasure]}
        />
        <RouteWidget 
          handleChange={(e) => (setSelectedMeasure(e.target.value))}
          selected={selectedMeasure}
        />
        <Legend />
      </div>
    </AppContext.Provider>
  );
}

export default App;
