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
            defaultPhotoPath: '',
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
            photos: [],
            plantId: 0,
            captionBox: '',
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
                let photoArray = [];
                console.log(data.markers);
                data.photos.forEach(function(photo){
                  photoArray.push({
                    photo: photo.photopath,
                    caption: photo.caption
                  })
                })

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
                    plantId: plantID,
                    photos: photoArray,
                    defaultPhotoPath: data.defaultPhoto[0].photopath
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
        console.log(buttonState.lat);
        let request = { method: 'POST',
                  mode: 'cors',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(
                  {
                    x_coor: buttonState.lon,
                    y_coor: buttonState.lat,
                    plantid: this.state.plantId
                  }),
                };

        fetch(`http://localhost:9000/map/add_marker`, request)
        .then( response => console.log(response))
        .then( (data) => {
          console.log(data);
          this.setState({
            buttonLat: buttonState.lat,
            buttonLon: buttonState.lon
          });
        })
        .catch((error) => console.error(error));
    }

        valueChange = (e) => {
          this.setState({
            [e.target.name] : e.target.value
          })
        }

    uploadPhotos = (e) => {
      let imageForm = new FormData();

      console.log(e.target.files[0]);
      imageForm.append("photoName", `${Date.now()}-${e.target.files[0].name}`)
      imageForm.append("userId", 1); //TODO: pass a userid to this component
      imageForm.append("plantId", this.state.plantId); //
      imageForm.append("caption", this.state.captionBox);
      imageForm.append("imageData", e.target.files[0])

      let request =
      { method: 'POST',
        mode: 'cors',
        body: imageForm,
      };

      fetch('http://localhost:9000/photo/upload_photo', request)
      .then( (response) => {
          console.log(response.body);
          response.json();
      })
      .then( resp => {
        console.log("Successful Upload")
        })
      .catch((error) => console.error(error));
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
                    <img src={this.state.defaultPhotoPath} class="sakura"/>
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
                    <div class="photosButton">
                    <div class="uploadPhoto">
                      <br/>
                      <form method="post" enctype="multipart/form-data">
                        <input type="file" onChange={(e) => this.uploadPhotos(e)} sname="files[]" multiple /><br/>
                        Caption: <input type="text" name="captionBox" onChange={(e) => this.valueChange(e)}/><br/>
                      </form>
                    </div>
                    </div>
                    <div class="photosGrid">
                      <PhotoGallery photos={this.state.photos} width="200px" height="200px"/>
                    </div>
                </div>
                {this.state.showPlantFormPopup ?  <PlantForm text='Click "Close Button" to hide popup'  plantState={this.state} closePopup={this.togglePlantFormPopup.bind(this)} onSubmit={this.onSubmitPlantForm.bind(this)} /> : null}
                {this.state.showMarkerFormPopup ?  <MarkerForm text='Click "Close Button" to hide popup'  closePopup={this.toggleMarkerFormPopup.bind(this)} onSubmit={this.onSubmitMarkerForm.bind(this)} /> : null}

            </div>


        );
    }
}
