import React, { useState} from 'react';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
// import { Icon } from "leaflet";
import * as mapData from "./mapData";

// const customIcon = new Icon({
//   iconUrl: "/myCustomIcon.svg",
//   iconSize: [25, 25]
// });

// EXAMPLE :: Data is mapped from external source using this example: https://blog.logrocket.com/how-to-use-react-leaflet/

const MapModuleView = () => {
  // console.log('Map Module view');
  const [activePark, setActivePark] = useState(null);
  // console.log('mapData', mapData);
  // console.log('mapData', JSON.stringify(mapData));

  return (
    <Map center={[45.4, -75.7]} zoom={12}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {mapData.features.map(park => (
        <Marker
          key={park.properties.PARK_ID}
          position={[
            park.geometry.coordinates[1],
            park.geometry.coordinates[0]
          ]}
          onClick={() => {
            setActivePark(park);
          }}
          // icon={customIcon}
        />
      ))}
      {activePark && (
        <Popup
          position={[
            activePark.geometry.coordinates[1],
            activePark.geometry.coordinates[0]
          ]}
          onClose={() => {
            setActivePark(null);
          }}
        >
          <div>
            <h2>{activePark.properties.NAME}</h2>
            <p>{activePark.properties.DESCRIPTION}</p>
          </div>
        </Popup>
      )}
    </Map>
  )
}

export default MapModuleView;
