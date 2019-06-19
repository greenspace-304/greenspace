import React from 'react';
import './MapPage.css'

import {Map} from '../components/Map';

export class MapPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            markers: [],
            xCoordinate: 0,
            yCoordinate: 0
        }
    }

    componentDidMount() {
        //TODO update X and Y coordinates and get all markers
        //TODO if possible, please put all markers in the form: <Marker position={{ lat: 49.246292, lng: -123.116226 }} />
        fetch("http://localhost:9000/map")
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            this.setState({
                markers: data
            });
        })
        .catch(err => console.error(err));
    }

    render() {
        return (
            <div class="mapPageContainer">
                <div class="markerFilterButton">
                    <p>PlaceHolder</p> 
                </div>
                <div class="mapComponent">
                    <Map markers={this.state.markers} xCoordinate={this.state.xCoordinate} yCoordinate={this.state.yCoordinate}/>
                </div>
            </div>
        );
    }
}