import React from 'react';
import './PlantDescription.css';

import {PlantCard} from '../components/PlantCard';
import sakura from '../images/icons/sakura.jpg';
import {Map} from '../components/Map';
import {PlantForm} from '../components/PlantForm';
import {MarkerForm} from '../components/MarkerForm';
import {Popup} from '../components/Popup';
import {PhotoGallery} from '../components/PhotoGallery';
import {QueryGrid} from '../components/QueryGrid';

export class PlantDescription extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showPlantFormPopup: false,
            showMarkerFormPopup: false,
            commonName: '',
            scientificName: '',
            description: '',
            category: '',
            growthType: '',
            barkTexture: '',
            barkColor: '',
            barkThickness: '',
            flowerColor: '',
            petalNumber: '',
            leafColor: '',
            leafShape: '',
            leafArrangement: '',
            hasThorns: false,
            fruitType: '',
            fruitColor: '',
            fruitShape: '',
            floweringSeason: '',
            markers: [],
            buttonLat: 0,
            buttonLon: 0,
            headings: ['Category', 'Value'],
            plantId: 0,
            rows: []
        }

        this.generateRows = this.generateRows.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0,0);

        let plantID = this.props.match.params.id;
        console.log(plantID);

        let plantRequest = { method: 'POST',
                  mode: 'cors',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      "plantId": plantID,
                      "userId": 1001
                  }),
        };

        fetch('http://localhost:9000/plantdescription', plantRequest)
            .then( response => response.json())
            .then((data) => {
                let plantInfo = data.plants[0];
                console.log(plantInfo);
                this.setState({
                    commonName: plantInfo.CommonName,
                    scientificName: plantInfo.ScientificName,
                    description: plantInfo.Description,
                    category: plantInfo.Category,
                    growthType: plantInfo.GrowthType,
                    barkTexture: plantInfo.BarkTexture,
                    barkColor: plantInfo.BarkColor,
                    barkThickness: plantInfo.BarkThickness,
                    flowerColor: plantInfo.FlowerColor,
                    petalNumber: plantInfo.PetalNumber,
                    leafColor: plantInfo.LeafColor,
                    leafShape: plantInfo.LeafShape,
                    leafArrangement: plantInfo.LeafArrangement,
                    hasThorns: plantInfo.HasThorns == 0 ? false : true,
                    fruitType: plantInfo.FruitType,
                    fruitColor: plantInfo.FruitColor,
                    fruitShape: plantInfo.FruitShape,
                    floweringSeason: plantInfo.FloweringSeason,
                    markers: data.markers,
                    plantId: plantID
                }, this.generateRows);
            })
            .catch((error) => console.error(error));


    }

    togglePlantFormPopup() {
        this.setState({
             showPlantFormPopup: !this.state.showPlantFormPopup
        });
    }

    onSubmitPlantForm(buttonState) {
      console.log("REACHED THE BUTTON FUNCTION")
      console.log(buttonState);
      let request = { method: 'POST',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                {
                  commonName: buttonState.commonName,
                  scientificName: buttonState.scientificName,
                  description: buttonState.description,
                  category: buttonState.category,
                  growthType: buttonState.growthType,
                  barkTexture: buttonState.barkTexture,
                  barkColor: buttonState.barkColor,
                  barkThickness: buttonState.barkThickness,
                  flowerColor: buttonState.flowerColor,
                  petalNumber: buttonState.petalNumber,
                  leafColor: buttonState.leafColor,
                  leafShape: buttonState.leafShape,
                  leafArrangement: buttonState.leafArrangement,
                  hasThorns: buttonState.hasThorns,
                  fruitType: buttonState.fruitType,
                  fruitColor: buttonState.fruitColor,
                  fruitShape: buttonState.fruitShape,
                  floweringSeason: buttonState.floweringSeason,
                  plantId: this.state.plantId
                }),
              };

      fetch(`http://localhost:9000/plantdescription/update_plant`, request)
      .then( response => response.json())
      .then( (data) => {
        console.log(data);
        this.setState({
            showPlantFormPopup: false,
            commonName: buttonState.commonName,
            scientificName: buttonState.scientificName,
            description: buttonState.description,
            category: buttonState.category,
            growthType: buttonState.growthType,
            barkTexture: buttonState.barkTexture,
            barkColor: buttonState.barkColor,
            barkThickness:buttonState.barkThickness,
            flowerColor:buttonState.flowerColor,
            petalNumber: buttonState.petalNumber,
            leafColor: buttonState.leafColor,
            leafShape: buttonState.leafShape,
            leafArrangement: buttonState.leafArrangement,
            hasThorns: buttonState.hasThorns == 0 ? false : true,
            fruitType: buttonState.fruitType,
            fruitColor: buttonState.fruitColor,
            fruitShape: buttonState.fruitShape,
            floweringSeason: buttonState.floweringSeason
        });
      })
      .catch((error) => console.error(error));


    }

    toggleMarkerFormPopup() {
        this.setState({
            showMarkerFormPopup: !this.state.showMarkerFormPopup
        });
    }

    onSubmitMarkerForm(buttonState) {
        console.log(buttonState);
        this.setState({
            buttonLat: buttonState.lat,
            buttonLon: buttonState.lon
        });
    }

    generateRows() {
        this.setState({
            rows: [["Category", this.state.category],
                   ["Growth Type", this.state.growthType],
                   ["Bark Thickeness", this.state.barkThickness],
                   ["Bark Color", this.state.flowerColor],
                   ["Flower Color", this.state.flowerColor],
                   ["Petal Number", this.state.petalNumber],
                   ["Leaf Color", this.state.leafColor],
                   ["Leaf Shape", this.state.leafShape],
                   ["Leaf Arrangement", this.state.leafArrangement],
                   ["Has Thorns", this.state.hasThorns],
                   ["Fruit Type", this.state.fruitType],
                   ["Fruit Color", this.state.fruitColor],
                   ["Fruit Shape", this.state.fruitShape],
                   ["Flowering Season", this.state.floweringSeason]
                ]
        })
    }

    render() {
        return (
            <div class="plantContainer">
                <div class="plantTitle">
                    <h1 class="commonName">{this.state.commonName}</h1>
                    <h4 class="plantScientificName">{this.state.scientificName}</h4>
                    <div class="collectionsButton"><button onClick={this.togglePlantFormPopup.bind(this)}>Edit Plant</button></div>
                </div>
                <div class="plantBody">
                    <img src={sakura} class="sakura"/>
                    <div class="plantDescription"><p >{this.state.description}</p></div>
                    <div class="plantGrid"><QueryGrid headings={this.state.headings} rows={this.state.rows} /></div>
                </div>
                <div class="map">
                    <h3 class="mapTitle">Where Users Have Found This Plant</h3>
                    <div class="markerButton"><button onClick={this.toggleMarkerFormPopup.bind(this)}>Add Marker</button></div>
                    <div class="mapMap"><Map markers={this.state.markers}/></div>
                </div>
                <div class="photos">
                    <h3 class="photosTitle">Photos</h3>
                    <div class="photosButton"><h3>Button</h3></div>
                    <div class="photosGrid">PhotoGallery{/*<PhotoGallery photos={this.state.photos}*/}</div>
                </div>
                {this.state.showPlantFormPopup ?  <PlantForm text='Click "Close Button" to hide popup'  plantState={this.state} closePopup={this.togglePlantFormPopup.bind(this)} onSubmit={this.onSubmitPlantForm.bind(this)} /> : null}
                {this.state.showMarkerFormPopup ?  <MarkerForm text='Click "Close Button" to hide popup'  closePopup={this.toggleMarkerFormPopup.bind(this)} onSubmit={this.onSubmitMarkerForm.bind(this)} /> : null}

            </div>


        );
    }
}
