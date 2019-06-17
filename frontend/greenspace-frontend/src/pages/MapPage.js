import React from 'react';
import './MapPage.css'

import {Map} from '../components/Map';

export class MapPage extends React.Component {
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