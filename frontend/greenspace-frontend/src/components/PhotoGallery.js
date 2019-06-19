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

    uploadPhotos = (e) => {
      let imageForm = new FormData();

      imageForm.append("photoName", this.state.photoName);
      imageForm.append("userId", 1); //TODO: pass a userid to this component
      imageForm.append("plantId", 3001); //
      imageForm.append("caption", this.state.caption);
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

    valueChange = (e) => {
      this.setState({
        [e.target.name] : e.target.value
      })
    }

    render() {
        return (
            <div>
                <h1>Photo Gallery</h1>
                <div class="uploadPhoto">
                  <form method="post" enctype="multipart/form-data">
                    <input type="file" onChange={(e) => this.uploadPhotos(e)} sname="files[]" multiple />
                    <input type="text" name="caption" onChange={(e) => this.valueChange(e)}/>
                    <input type="text" name="photoName" onChange={(e) => this.valueChange(e)}/>

                  </form>
                </div>
                <div class="photoGallery">
                {this.generatePhotos()}
                </div>
            </div>
        );
    }
}
