import React from 'react';
import './MyBookmarksPage.css';

import {QueryGrid} from '../components/QueryGrid';


export class MyBookmarksPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userID: 0,
            headings: ['Plant Name'],
            rows:[]
        }
    }

    render() {
        return(
            <div class="myBookmarksContainer">
                <QueryGrid headings={this.state.headings} rows={this.state.rows} />
            </div>
        );
    }
}