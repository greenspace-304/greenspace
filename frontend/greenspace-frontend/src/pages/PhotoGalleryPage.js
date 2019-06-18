import React from 'react';
import './PhotoGalleryPage.css';

import {PhotoGallery} from '../components/PhotoGallery';
import sakura from '../images/icons/sakura.jpg';
import logo from '../images/icons/greenspace_logo.png';

export class PhotoGalleryPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            photoArray: []
        }
    }

    componentDidMount() {
      //TODO get all user uploaded photos, and then use this.setState to update photoArray. Follow template to see how photos should be stored within the array
      //TODO the photo attribute is the src/filepath
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
                    <PhotoGallery photos={template} width="200px" height="200px"/>
                </div>
            </div>


        );

    }
}
