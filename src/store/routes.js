import React        from "react";
import Landing      from "../components/Landing/Landing";
import MapView      from "../components/MapView";

const routes = [
  { name: "Landing", path: "/", exact: true, main: () => <Landing /> },
  { name: "MapView", path: "/mapview", exact: true, main: () => <MapView /> },
];

export default routes;
