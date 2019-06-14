import React from 'react';
import './Photo.css';

export class Photo extends React.Component {

    constructor(props){
        super(props);
        this.checkCaption = this.checkCaption.bind(this);
        this.getContainerStyle = this.getContainerStyle.bind(this);
        this.getPhotoStyle = this.getPhotoStyle.bind(this);
    }
    
    getContainerStyle = () => {
        return this.props.caption ? "containerWCaption curveTopBorder boxShadow" : "containerWOCaption curveBottomBorder curveTopBorder boxShadow";
    }

    getPhotoStyle = () => {
        return this.props.caption ? "containerWCaption photoBorder curveTopBorder boxShadow" : "containerWOCaption photoBorder curveBottomBorder curveTopBorder boxShadow";
    }

    checkCaption = () => {
        return this.props.caption ? <div class="photoCaption curveBottomBorder boxShadow">{this.props.caption}</div> : null;
    }

    render() {
        const outerStyle = this.getContainerStyle();
        const photoStyle = this.getPhotoStyle();
        console.log(this.props.photo);

        return (
            <div class= {outerStyle}>
                <div class= {photoStyle}>
                    <img src={this.props.photo}/> 
                </div>
                {this.checkCaption()}
            </div>
        );
    }
}