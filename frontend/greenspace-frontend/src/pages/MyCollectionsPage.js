import React from 'react';
import './MyCollectionsPage.css';

import {QueryGrid} from '../components/QueryGrid'

export class MyCollectionsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userID: 0,
            headings: ["Collection Name"],
            rows: [["Collection 1"], ['Collection 2']]
        }
    }

    render() {
        return (
            <div class="myCollectionsPageContainer">
                <div><QueryGrid headings={this.state.headings} rows={this.state.rows} /></div>
            </div>
        );
    }
}