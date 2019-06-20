import React from 'react';
import './PhotoGalleryPage.css';

import {PhotoGallery} from '../components/PhotoGallery';
import sakura from '../images/icons/sakura.jpg';
import logo from '../images/icons/greenspace_logo.png';

export class PhotoGalleryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photoArray: [],
            userID: this.props.userID,
            valid: this.props.valid
        }
    }

    componentDidMount() {
      //TODO get all user uploaded photos, and then use this.setState to update photoArray. Follow template to see how photos should be stored within the array
      //TODO the photo attribute is the src/filepath
      fetch("http://localhost:9000/photo/userphotos")
      .then(response => response.json())
      .then((data) => {
        let photoArray = [];
        for(let i=0; i<data.length; i++){
          photoArray.push({
            photo: data[i].photopath,
            caption: data[i].caption
          })
        }
        console.log(photoArray);
        this.setState({
          photoArray: photoArray
        })
      })
      .catch((error) => console.error(error));

      console.log("CHEERS");
      console.log(this.props.userID);
      console.log(this.props.valid);
    }

    componentWillReceiveProps(nextProps) {
      console.log(nextProps.userID);
      this.setState({
          userID: nextProps.userID,
          valid: nextProps.valid
      });
  }



    render() {

        const template = [{
            photo: sakura,
            caption: "these are cherry blossoms"
          },
          {
            photo: logo,
            caption: "this is a logo"
          }
          ];
        return (
            <div class="photoGallery-container">
                <div class="photoGallery-button"></div>
                <div>
                    <PhotoGallery photos={this.state.photoArray} width="200px" height="200px"/>
                </div>
            </div>


        );

    }
}
