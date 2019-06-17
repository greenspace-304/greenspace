import React from 'react';
import './Popup.css';

export class Popup extends React.Component {

    render() {
        return (
            <div class="popContainer">
                <div class="popContent">
                    <h1> Hello </h1>
                    <div class="buttonContainer">
                        <button id="close" onClick={this.props.closePopup}>Cancel</button>
                        <button id="submit" onClick={this.props.submitForm}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}