import React from 'react';

import {Collection} from '../components/Collection';

export class ViewCollectionPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collectionID: this.props.collectionID,
            collectionName: '',
            collectionPlants: []
            /* *CollectionPlants requires plant photo and caption */
        }
    }

    componentDidMount() {
        //TODO update the collectionName and collectionPlants
    }

    render() {
        return(
            <div class="viewCollectionContainer">
                <Collection collection={this.state.collectionPlants} collectionName={this.state.collectionName} />
            </div>
        );
    }
}