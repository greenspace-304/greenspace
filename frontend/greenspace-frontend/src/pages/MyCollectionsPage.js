import React from 'react';
import './MyCollectionsPage.css';

import {QueryGrid} from '../components/QueryGrid'

export class MyCollectionsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userID: 0,
            headings: ["Collection Name"],
            rows: [["Collection 1 Name"], ['Collection 2 Name']]
        }
    }

    componentDidMount() {
        //TODO return the list of collections for a user, do not change headings and follow the template for rows
    }

    render() {
        return (
            <div class="myCollectionsPageContainer">
                <div><QueryGrid headings={this.state.headings} rows={this.state.rows} /></div>
            </div>
        );
    }
}