import React from 'react';
import './MapPage.css'

import {Map} from '../components/Map';

export class MapPage extends React.Component {

    constructor(props) {
        super(props);

        this.setState({
            markers: [],
            xCoordinate: 0,
            yCoordinate: 0
        })
    }

    componentDidMount() {
        //TODO update X and Y coordinates and get all markers
        //TODO if possible, please put all markers in the form: <Marker position={{ lat: 49.246292, lng: -123.116226 }} />
    }

    render() {
        return (
            <div class="mapPageContainer">
                <div class="markerFilterButton">
                    <p>PlaceHolder</p> 
                </div>
                <div class="mapComponent">
                    <Map />
                </div>
            </div>
        );
    }
}