import React from 'react';
import './MyImagesPage.css';

import {PhotoGallery} from '../components/PhotoGallery';

export class MyImagesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userID: 0,
            photoArray: [],
            delete: true
        }
    }

    render() {
        return(
            <div class="myImagesContainer">
                <div class="myImages-PhotoGallery">
                    <PhotoGallery photos={this.state.photoArray} />
                </div>
            </div>
        );
    }
}