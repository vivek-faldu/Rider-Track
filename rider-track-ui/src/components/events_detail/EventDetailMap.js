/**
 * Author: Shaunak Shah
 * Task: Add start and finish markers.
 * Task no: 171
 * Date: 11/14/2019
 */

import React, { useEffect, useRef } from 'react';
import MapGL, { NavigationControl, Marker, Popup } from 'react-map-gl';
import { Fab, Typography } from '@material-ui/core';
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

  const [markers, setMarks] = React.useState({
    start: [],
    end: [],
  })

  let reactMap = useRef(null);

  // method to update the viewport as dragged on screen.
  const updateViewport = (viewport) => {
    setState({ viewport });
  };

  // method to move center of the page to coordinates passed in.
  // Very important to load once the coordinates are initialized.
  // We use starting point of the track as initial center.
  function goToPoint(center, route) {
    setState({
      coord: route,
      viewport: {
        latitude: center[0],
        longitude: center[1],
        zoom: 11.5,
        bearing: 0,
        pitch: 0,
      },
    });
  }

  async function fetchData(a, b, c) {
    let url = 'https://api.mapbox.com/directions/v5/mapbox/driving/';
    url = url.concat(`${a}?geometries=geojson&access_token=${TOKEN}`);
    const res = await fetch(url);
    res.json()
      .then((result) => {
        goToPoint(b, result.routes);

        setMarks({
          start: result.routes[0].geometry.coordinates[0],
          end: result.routes[0].geometry.coordinates[1],
        })

        const map = c.getMap();

        map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'LineString',
                    coordinates: result.routes[0].geometry.coordinates,
                  },
                },
              ],
            },
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#1DB954',
            'line-width': 3,
          },
        });

        map.addLayer({
          id: 'start_point',
          type: 'symbol',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: "Feature",
                  geometry: {
                    coordinates: result.routes[0].geometry.coordinates[0],
                    type: "Point"
                  },
                  properties: {
                    title: 'Start',
                    icon: 'marker',
                  }
                },
                {
                  type: "Feature",
                  geometry: {
                    coordinates: result.routes[0].geometry.coordinates[result.routes[0].geometry.coordinates.length-1],
                    type: "Point"
                  },
                  properties: {
                    title: 'Finish',
                    icon: 'marker',
                  }
                },
              ],
            },
          },

          layout: {
            // get the icon name from the source's "icon" property
            // concatenate the name to get an icon from the style's sprite sheet
            "icon-image": ["concat", ["get", "icon"], "-15"],
            // get the title name from the source's "title" property
            "text-field": ["get", "title"],
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.6],
            "text-anchor": "top",
            }
        });
      });
  }

  useEffect(() => {
    const pts = [];
    let c = 0;
    if (props.coordinate != null) {
      let str = '';
      props.coordinate.forEach((point) => {
        str += `${point.longitude},${point.latitude}`;
        if (props.coordinate.length - 1 !== c) {
          str += ';';
          pts[0] = point.latitude;
          pts[1] = point.longitude;
        }
        c += 1;
      });
      fetchData(str, pts, reactMap);
    }
  }, [props.coordinate]);

  // const getMarker = (coord) => (
  //   // console.log(markers.start);
  //   <Marker latitude={coord[0]} longitude={coord[1]} offsetLeft={-20} offsetTop={-10}> <div>start</div> </Marker>
  // );

  const TOKEN = 'pk.eyJ1Ijoidml2ZWtmYWxkdSIsImEiOiJjazBzaGI1aGMwMm1hM2hwZDY5Zmc0OHd5In0.I2EViz8YDQwXvwW_38Oujg';
  return (
    <MapGL
      ref={(map) => reactMap = map}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...state.viewport}
      width="100%"
      height="500px"
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={updateViewport}
      mapboxApiAccessToken={TOKEN}
      style={{ padding: 10 }}
    >
      {/* <Marker
        latitude={markers.start}
        longitude={markers.end}
        offsetLeft={-20}
        offsetTop={-10}
        >
          <div>start</div>
        </Marker> */}

      <div className="detail_map_frame">
        <NavigationControl onViewportChange={updateViewport} />
      </div>

        {/* {getMarker(markers.start)} */}
    </MapGL>
  );
}

export default EventDetailMap;
