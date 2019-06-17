import React from 'react';
import './PlantCard.css';

export class PlantCard extends React.Component {
    render() {
        return (
            <div class="plantCard">
                <div class="image">
                    <img src={this.props.plantImg} />
                </div>
                <div class="caption">
                    <p><b>{this.props.caption}</b></p>
                </div>
            </div>
        );
    }
}