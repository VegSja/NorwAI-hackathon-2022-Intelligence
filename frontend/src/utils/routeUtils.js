import Query from "@arcgis/core/rest/support/Query";
import * as route from "@arcgis/core/rest/route";
import FeatureSet from "@arcgis/core/rest/support/FeatureSet";
import RouteParameters from "@arcgis/core/rest/support/RouteParameters";
import Graphic from "@arcgis/core/Graphic";

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const getRandomRoute = (point, radius, context) => {
  return new Promise((resolve, reject) => {
    const routeService = "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";
    const query = new Query();
    query.returnGeometry = true;
    query.geometry = point;
    query.distance = radius;
    query.units = "kilometers";
    query.outFields = ["*"];
    context.featureLayer.value.queryFeatures(query).then(async (results) => {
      console.log(results);
      const routeUrl = routeService;
      const fromGraphic = new Graphic({
        geometry: point,
      });

      const shuffledArray = shuffle(results.features);

      var routeParams = new RouteParameters({
        stops: new FeatureSet({
          features: [fromGraphic, shuffledArray[0], shuffledArray[1], fromGraphic] // Pass the array of graphics
        }),
        returnDirections: false
      });

      try {
        const data = await route.solve(routeUrl, routeParams);
        // Display the route
        resolve(
          {
            data: data,
            point1: shuffledArray[0],
            point2: shuffledArray[1]
          });
      } catch (error) {
        resolve([]);
      }
    });
  });
}

export default getRandomRoute;