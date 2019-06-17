import React from 'react';
import './Collection.css';
import {PlantCard} from './PlantCard';

export class Collection extends React.Component {
    constructor(props){
        super(props);
        this.generatePlantCards = this.generatePlantCards.bind(this);
    }
    


    generatePlantCards() {
        return this.props.collection.map(function (plant){
            return <PlantCard plantImg={plant.photo} caption={plant.caption} />
        });

    }

    render() {
        return (
            <div>
                <h1>{this.props.collectionName}</h1>
                <div class="collection">
                    {this.generatePlantCards()}
                </div>
            </div>
        );
    }
}
