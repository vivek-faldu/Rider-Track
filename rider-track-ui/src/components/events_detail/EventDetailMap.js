/**
 * Author: Shaunak Shah
 * Task: Changed from static view to dynamically using the coordinates
 *        provided by parent component.
 * Task no: 66
 * Date: 10/05/2019
 */

import React, { useEffect } from 'react';
import MapGL, { NavigationControl } from 'react-map-gl';
import './EventsDetail.css';
import PolylineOverlay from './PolyLineOverlay';

function EventDetailMap(props) {
  // set inital state of the page.
  const [state, setState] = React.useState({
    viewport: {
      latitude: 0,
      longitude: 0,
      zoom: 2,
      bearing: 0,
      pitch: 0,
    },
  });

  // method to update the viewport as dragged on screen.
  const updateViewport = (viewport) => {
    setState({ viewport });
  };

  // method to move center of the page to coordinates passed in.
  // Very important to load once the coordinates are initialized.
  // We use starting point of the track as initial center.
  function goToPoint(center) {
    setState({
      viewport: {
        latitude: center[0],
        longitude: center[1],
        zoom: 14,
        bearing: 0,
        pitch: 0,
      },
    });
  }

  useEffect(() => {
    const pts = [];
    if (props.coordinate != null) {
      props.coordinate.forEach((point) => {
        pts[0] = point.lat;
        pts[1] = point.long;
        goToPoint(pts);
        return true;
      });
    }
  }, [props.coordinate]);

  const TOKEN = 'pk.eyJ1Ijoidml2ZWtmYWxkdSIsImEiOiJjazBzaGI1aGMwMm1hM2hwZDY5Zmc0OHd5In0.I2EViz8YDQwXvwW_38Oujg';
  return (
    <MapGL
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...state.viewport}
      width="100%"
      height="500px"
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={updateViewport}
      mapboxApiAccessToken={TOKEN}
      style={{ padding: 10 }}
    >

      <div className="detail_map_frame">
        <NavigationControl onViewportChange={updateViewport} />
      </div>

      <PolylineOverlay points={props.coordinate} />

    </MapGL>
  );
}

export default EventDetailMap;
