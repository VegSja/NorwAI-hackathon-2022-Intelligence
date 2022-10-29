import React, { useRef, useEffect, useContext } from "react";

import esriConfig from "@arcgis/core/config.js";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import Locate from "@arcgis/core/widgets/Locate";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

import { AppContext } from "../state/context";
import "../App.css";


const colors = {
  low: [102, 255, 102, 0.8],
  medium: [227, 139, 79, 0.8],
  high: [255, 0, 0, 0.8]

}

const MapComponent = (props) => {
  const context = useContext(AppContext);
  // Required: Set this property to insure assets resolve correctly.
  esriConfig.assetsPath = "./assets";
  const mapDiv = useRef(null);

  // Opprett kartet
  useEffect(() => {
    if (mapDiv.current) {
      // Det første vi trenger er et Map objekt med bakgrunnskart
      // Konstruktøren er allerede i koden, men vi må velge bakgrunnskartet
      // En liste med valg inner vi i API dokumentasjonen:
      // https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap
      const map = new Map({
        basemap: "topo-vector",
      });

      let square_size = 0.03649729207*3/4

      let polygon_positions = []

      for(let i=0; i < props.polygons.length; i++) {
        polygon_positions.push([parseFloat(props.polygons[i]["x"]), parseFloat(props.polygons[i]["y"])])
      }


      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);


      const simpleFillSymbol = {
          type: "simple-fill",
          color: [227, 139, 79, 0.8],  // Orange, opacity 80%
          outline: {
              color: [255, 255, 255],
              width: 0
          }
      };
      
      for(let row = 0; row < polygon_positions.length ; row++) {
          // Create a polygon geometry
          console.log("looking into", polygon_positions[row])
          const polygon = {
              type: "polygon",
              rings: [
                  [polygon_positions[row][0] + square_size, polygon_positions[row][1]], //Longitude, latitude
                  [polygon_positions[row][0], polygon_positions[row][1]], //Longitude, latitude
                  [polygon_positions[row][0], polygon_positions[row][1] + square_size/2], //Longitude, latitude
                  [polygon_positions[row][0] + square_size, polygon_positions[row][1] + square_size/2] //Longitude, latitude
              ]
          };

          const correlation = props.polygons["correlation"] 

          if(correlation < 0.33 && correlation > 0) {
            simpleFillSymbol.color = colors.low
          }
          else if(correlation < 0.66 && correlation > 0.33) {
            simpleFillSymbol.color = colors.medium
          }
          else if(correlation < 1 && correlation > 0.66) {
            simpleFillSymbol.color = colors.high
          }

          console.log(simpleFillSymbol)

          const polygonGraphic = new Graphic({
              geometry: polygon,
              symbol: simpleFillSymbol,
          });
          graphicsLayer.add(polygonGraphic);
      }


      // Legg til dataen i kartet
      //map.add(featureLayer);

      // Legg til dataen i context
      //context.featureLayer.set(featureLayer);

      // For å kunne vise kartet må dette legges til i et MapView
      // Dokumentasjonen for MapView finnes her:
      // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
      new MapView({
        map: map,
        container: mapDiv.current,
        extent: {
          ymin: 60.8005086, 
          xmin: 8.27232981,
          ymax: 60.863289, 
          xmax: 8.433792,
        },
      }).when((mapView) => {
        // Esri har mange widgets som er enkle å legge til i kartet
        // En av disse er locate widgeten, som flytter kartet til din possisjon
        // Widgeten må først opprettes, så plasseres på kartet
        // Dokumentasjon for dette er på:
        // https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Locate.html
        // En god idé er å sette zoom nivået med scale attributten, f. eks scale 5000
        var locateWidget = new Locate({
          view: mapView,
          scale: 5000,
        });
        mapView.ui.add(locateWidget, "top-left");

        // Vi har og lagd en egen widged som kan legges til
        // Denne ligger i components/RouteWidget, men den er ikke helt ferdig enda
        // Den må først legges til i App.js fila, men det er noen feil med den

        // Det første vi må gjøre er å sørge for at Widgeten har tilgang til MapViewet
        // Dette kan gjøres ved å legge den til i contexten vår
        // Resten av feilene må løses i RouteWidget fila
        context.mapView.set(mapView);

        // Til slutt ønsker vi at brukeren skal kunne velge startssted for widget selv
        // Dette kan gjøres ved å bruke lokasjonen fra locate widgeten, eller ved å f. eks klikke i kartet
        // For å kunne bruke locate widgeten trenger vi en lytter på widgeten.
        // Mer om dette finnes på siden:
        // https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Locate.html#on
        // Det er mulig å lagre resultatet ra widgeten i contexten med context.point.set()
        locateWidget.on("locate", function (locateEvent) {
          if (locateEvent.position.coords) {
            context.point.set({
              type: "point",
              latitude: locateEvent.position.coords.latitude,
              longitude: locateEvent.position.coords.longitude,
            });
          }
        });

        // For å kunne klikke i kartet trenger vi en lytter på MapViewet
        // Dette gjøres ganske likt som for locate widgeten, og mer info er på API siden for MapView
        mapView.on("click", (event) => {
          context.point.set(event.mapPoint);
        });

        // For klikk i kart er det og ønsket å legge til et punkt som viser hvor brukeren har klikket
        // For å gjøre dette trenger vi å ta i bruk noe for symbologi, f. eks SimpleMarkerSymbol
        // https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleMarkerSymbol.html
        // Og vi trenger en grafikk som legges til MapView
        // https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
        // hint: se på koden i RouteWidget
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.polygons]);

  useEffect(() => {
    if (context.mapView.value) {
      const mapView = context.mapView.value;

      const oldPoint = mapView.graphics.items.filter((item) => {
        return item.geometry.type === "point";
      })[0];
      mapView.graphics.remove(oldPoint);

      const simpleMarkerSymbol = {
        type: "simple-marker",
        color: "#1976d2", // Blue
        outline: {
          color: [255, 255, 255], // White
          width: 1,
        },
      };

      const pointGraphic = new Graphic({
        geometry: context.point.value,
        symbol: simpleMarkerSymbol,
      });

      mapView.graphics.add(pointGraphic);
    }
  }, [context.point.value, context.mapView.value]);

  return <div className="mapDiv" ref={mapDiv}></div>;
};

export default MapComponent;
