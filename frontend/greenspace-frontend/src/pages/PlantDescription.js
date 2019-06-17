import React from 'react';
import './PlantDescription.css';

import {PlantCard} from '../components/PlantCard';
import sakura from '../images/icons/sakura.jpg';
import {Map} from '../components/Map';
import {PlantForm} from '../components/PlantForm';
import {MarkerForm} from '../components/MarkerForm';
import {Popup} from '../components/Popup';
import {PhotoGallery} from '../components/PhotoGallery';

export class PlantDescription extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            plantID : this.props.plantID,
            showPlantFormPopup: false,
            showMarkerFormPopup: false,
            commonName: '',
            scientificName: '',
            description: '',
            category: '',
            growthType: '',
            barkTexture: '',
            barColor: '',
            barkThickness: '',
            flowerColor: '',
            petalNumber: '',
            leafColor: '',
            leafShape: '',
            leafArrangement: '',
            hasThorns: false,
            fruitType: '',
            fruitColor: '',
            floweringSeason: ''
        }
    }

    componentDidMount() {
        window.scrollTo(0,0);
    }

    togglePlantFormPopup() {
        this.setState({
             showPlantFormPopup: !this.state.showPlantFormPopup
        });
    }

    onSubmitPlantForm() {

    }

    toggleMarkerFormPopup() {
        this.setState({
            showMarkerFormPopup: !this.state.showMarkerFormPopup
        });
    }

    onSubmitMarkerForm() {

    }

    render() {
        return (
            <div class="plantContainer">
                <div class="plantTitle">
                    <h1 class="commonName">Sakura</h1>
                    <h4 class="plantScientificName">さくら</h4>
                    <div class="collectionsButton"><button onClick={this.togglePlantFormPopup.bind(this)}>Edit Plant</button></div>
                </div>
                <div class="plantBody">
                    <img src={sakura} class="sakura"/>
                    <div class="plantDescription"><p >{this.state.plantDescription}</p></div>
                    <ul class="attributes">
                        <li>Habitat: {this.state.habitat}</li>
                        <li>Category: {this.state.category}</li>
                        <li>Etc: They have a coke flavour for this!</li>
                    </ul>
                </div>
                <div class="map">
                    <h3 class="mapTitle">Where Users Have Found This Plant</h3>
                    <div class="markerButton"><button onClick={this.toggleMarkerFormPopup.bind(this)}>Add Marker</button></div>
                    <div class="mapMap"><Map /></div>
                </div>
                <div class="photos">
                    <h3 class="photosTitle">Photos</h3>
                    <div class="photosButton"><h3>Button</h3></div>
                    <div class="photosGrid">PhotoGallery{/*<PhotoGallery photos={this.state.photos}*/}</div>
                </div>
                {this.state.showPlantFormPopup ?  <PlantForm text='Click "Close Button" to hide popup'  closePopup={this.togglePlantFormPopup.bind(this)} onSubmit={this.onSubmitPlantForm.bind(this)} /> : null}
                {this.state.showMarkerFormPopup ?  <MarkerForm text='Click "Close Button" to hide popup'  closePopup={this.toggleMarkerFormPopup.bind(this)} onSubmit={this.onSubmitMarkerForm.bind(this)} /> : null}

            </div>


        );
    }
}
