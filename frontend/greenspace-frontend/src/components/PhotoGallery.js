import React from 'react';
import './PhotoGallery.css';
import {Photo} from './Photo';

export class PhotoGallery extends React.Component {
    constructor(props){
        super(props);

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
                <div class="uploadPhoto">
                  <form method="post" enctype="multipart/form-data">
                    <input type="file" name="files[]" multiple />
                    <input type="submit" value="Upload File" name="submit" />
                  </form>
                </div>
                <div class="photoGallery">
                {this.generatePhotos()}
                </div>
            </div>
        );
    }
}
