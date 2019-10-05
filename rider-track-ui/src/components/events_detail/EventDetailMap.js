/**
 * Author: Shaunak Shah
 * Task: Created map component
 * Task no: 65
 * Date: 10/05/2019
 */

import React, { useEffect } from 'react';
import MapGL, { NavigationControl } from 'react-map-gl';
import './EventsDetail.css';
import PolylineOverlay from './PolyLineOverlay';


function EventDetailMap(){
  const coordinates = [
    [-122.48369693756104, 37.83381888486939],
    [-122.48348236083984, 37.83317489144141],
    [-122.48339653015138, 37.83270036637107],
    [-122.48356819152832, 37.832056363179625],
    [-122.48404026031496, 37.83114119107971],
    [-122.48404026031496, 37.83049717427869],
    [-122.48348236083984, 37.829920943955045],
    [-122.48356819152832, 37.82954808664175],
    [-122.48507022857666, 37.82944639795659],
    [-122.48610019683838, 37.82880236636284],
    [-122.48695850372314, 37.82931081282506],
    [-122.48700141906738, 37.83080223556934],
    [-122.48751640319824, 37.83168351665737],
    [-122.48803138732912, 37.832158048267786],
    [-122.48888969421387, 37.83297152392784],
    [-122.48987674713133, 37.83263257682617],
    [-122.49043464660643, 37.832937629287755],
    [-122.49125003814696, 37.832429207817725],
    [-122.49163627624512, 37.832564787218985],
    [-122.49223709106445, 37.83337825839438],
    [-122.49378204345702, 37.83368330777276],
  ];

  const [state, setState] = React.useState({
    coord: coordinates,
    viewport: {
      latitude: 37.83080223556934,
      longitude: -122.48700141906738,
      zoom: 14,
      bearing: 0,
      pitch: 0,
    },
  })

  const updateViewport = (viewport) => {
    setState({ viewport });
  };

  useEffect(() => {
    setState({ coords: coordinates });
    updateViewport(state.viewport);
  }, []);

  const TOKEN = 'pk.eyJ1Ijoidml2ZWtmYWxkdSIsImEiOiJjazBzaGI1aGMwMm1hM2hwZDY5Zmc0OHd5In0.I2EViz8YDQwXvwW_38Oujg';

  return (
    <MapGL
      {...state.viewport}
      width="100%"
      height="500px"
      mapStyle="mapbox://styles/mapbox/dark-v9"
      // eslint-disable-next-line no-underscore-dangle
      onViewportChange={updateViewport}
      mapboxApiAccessToken={TOKEN}
      style={{ padding: 20 }}
    >

      <div className="detail_map_frame">
        <NavigationControl onViewportChange={updateViewport} />
      </div>

      <PolylineOverlay points={coordinates} />

    </MapGL>
  );
}

export default EventDetailMap;
