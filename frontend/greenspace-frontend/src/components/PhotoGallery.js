import React from 'react';
import './PhotoGallery.css';
import {Photo} from './Photo';

export class PhotoGallery extends React.Component {
    constructor(props){
        super(props);
        this.setState({
          caption: "",
          photoName: "",
          plantId: 3001
        });
        this.generatePhotos = this.generatePhotos.bind(this);
    }

    generatePhotos = () => {
        const height = this.props.height;
        const width = this.props.width;

        return this.props.photos.map(function (photo){
            console.log(photo.caption);
            console.log(photo.photo);
            return <div class="photo"><Photo photo={photo.photo} caption={photo.caption} height={height} width={width}/></div>
        });
    }


    render() {
        return (
            <div>
                <h1>Photo Gallery</h1>
                <div class="photoGallery">
                {this.generatePhotos()}
                </div>
            </div>
        );
    }
}
