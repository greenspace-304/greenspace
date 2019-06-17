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


    render() {
        return (
            <div class="myMarkersContainer">
                <div class="myMarkers-Grid"><QueryGrid headings={this.state.headings} rows={this.state.rows} /></div>
                <div class="myMarkers-Map"><Map /></div>
            </div>
        );

    }
}