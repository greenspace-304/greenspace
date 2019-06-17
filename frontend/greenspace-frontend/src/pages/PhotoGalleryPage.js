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

    

    render() {

        const photoArray = [{
            photo: sakura,
            caption: "these are cherry blossoms"
          },
          {
            photo: logo,
            caption: "this is a logo"
          },
          {
            photo: logo,
            caption: "this is a logo"
          },
          {
            photo: logo,
            caption: "this is a logo"
          },
          {
            photo: logo,
            caption: "this is a logo"
          },
          {
            photo: logo,
            caption: "this is a logo"
          },
          {
            photo: logo,
            caption: "this is a logo"
          },
          {
            photo: logo,
            caption: "this is a logo"
          },
          {
            photo: logo,
            caption: "this is a logo"
          },
          {
            photo: logo,
            caption: "this is a logo"
          },
          {
            photo: logo,
            caption: "this is a logo"
          },
          {
            photo: logo,
            caption: "this is a logo"
          },
          {
            photo: logo,
            caption: "this is a logo"
          },
          {
            photo: logo,
            caption: "this is a logo"
          },
          {
            photo: logo,
            caption: "this is a logo"
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
                    <PhotoGallery photos={photoArray} width="200px" height="200px"/>
                </div>
            </div>

            
        );

    }
}