import React from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';

export class Map extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        markers: []
      }
    }
    render() {
        let payloadFromBackend = fetch('http://localhost:9000/users')
                                    .then(function(response){
                                      return response.json();
                                    })
                                    .then(function(myJson){
                                      payloadFromBackend = JSON.stringify(myJson);
                                    });

        const MyMapComponent = withScriptjs(withGoogleMap((props) =>
          <GoogleMap
            defaultZoom={15}
            defaultCenter={{ lat: 49.246292, lng: -123.116226 }}
          >
            {props.isMarkerShown &&
            <Marker position={{ lat: 49.246292, lng: -123.116226 }} />}
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
