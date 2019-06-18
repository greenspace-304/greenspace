import React from 'react';
import './MyMarkersPage.css';

import {QueryGrid} from '../components/QueryGrid';
import {Map} from '../components/Map';

export class MyMarkersPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userID: 0,
            headings: ['Plant Name', 'X Coordinate', 'Y Coordinate'],
            rows: [],
            markers: []
        }
    }

    componentDidMount() {
        //TODO return the list of markers uploaded by a user. 
        //TODO Do not change headings, only update rows. rows will look like [[A, B, C], [D, E, F]]
        //TODO if possible, please put all markers in the form: <Marker position={{ lat: 49.246292, lng: -123.116226 }} />
    }


    render() {
        return (
            <div class="myMarkersContainer">
                <div class="myMarkers-Grid"><QueryGrid headings={this.state.headings} rows={this.state.rows} /></div>
                <div class="myMarkers-Map"><Map /></div>
            </div>
        );

    }
}