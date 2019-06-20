import React from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';

export class Map extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {

        const MyMapComponent = withScriptjs(withGoogleMap((props) =>
          <GoogleMap
            defaultZoom={12}
            defaultCenter={{ lat: 49.246292, lng: -123.116226 }}
          >
            {props.isMarkerShown && this.props.markers.map((marker) => {console.log(marker.X_COORDINATE); return <Marker position={{lat:marker.X_COORDINATE, lng:marker.Y_COORDINATE}} />})}
          </GoogleMap>
        ))

        return (
          <div id="map-container">
            <MyMapComponent
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
        );
    }
}
