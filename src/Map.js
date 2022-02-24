import React from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  layer,
  Circle,
  LayerGroup,
} from "react-leaflet";

import "./Map.css";
import { showDataOnMap } from "./Util";
function ChangeMapView({ coords, zoom }) {
  const map = useMap();
  map.setView(coords, zoom);
  return null;
}

function Map(props) {
  console.log(props);
  let position = [props.p_coordinate.lat, props.p_coordinate.long];
  let zoom = props.p_zoom;
  let showmarker = true;
  let circles = [];
  if (position[0] === 0) {
    showmarker = false;
  }
  if (zoom === 2) {
    circles = showDataOnMap(props.countriesInfo, props.casesType);
  } else {
    let countryInfo = props.countriesInfo.filter((country) => {
      if (
        country["countryInfo"].lat === props.p_coordinate.lat &&
        country["countryInfo"].long === props.p_coordinate.long
      )
        return true;
    });
    circles = showDataOnMap(countryInfo, props.casesType);
  }

  return (
    <div className="mapcontainer">
      <MapContainer center={position} zoom={zoom} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showmarker && <Marker position={position}></Marker>}
        <ChangeMapView coords={position} zoom={zoom} />
        <LayerGroup>{circles}</LayerGroup>
      </MapContainer>
    </div>
  );
}

export default Map;
