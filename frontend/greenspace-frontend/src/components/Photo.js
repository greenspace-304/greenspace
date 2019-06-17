import React from 'react';
import './Photo.css';

export class Photo extends React.Component {

    constructor(props){
        super(props);
    }

    

    render() {

        const wrapperStyle = {
            padding: '0px' ,
            width: this.props.width,
            height: this.props.height,
            margin: 'auto',
            overflow: 'hidden'
        }

        const imgContainerStyle = {
            height: this.props.height,
            width: this.props.width,
            position: 'relative',
            cursor: 'pointer'
        };

        const imgStyle = {
            height: this.props.height,
            width: this.props.width,
            position: 'absolute',
            objectFit: 'contain'
        };

        

        console.log(this.props.photo);

        return (
            <div class="wrapper" style={wrapperStyle}>
                <div class="image-container" style={imgContainerStyle}>
                    <img src={this.props.photo} style={imgStyle}/>
                    <div class="imgCaption">
                        <p>{this.props.caption ? this.props.caption : ''}</p>
                    </div> 
                </div>
            </div>
        );
    }
}