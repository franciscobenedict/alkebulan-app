import React          from 'react';
import { withRouter } from 'react-router-dom';
import MapModuleView from "./MapModule/MapModuleView";

const MapView = ({history}) => {
  return (
    <div className="main map">
      <MapModuleView />
    </div>
  )
}

export default withRouter(MapView);
