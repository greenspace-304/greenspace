import React from 'react';
import './DeleteForm.css';

export class DeleteForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tableName: '',
            primaryKey: [],
        }
    }

    onSubmit(e) {
        e.preventDefault();
        //TODO delete
    }

    render() {
        return(
            <div class="popContainer-delete">
                <div class="popContent-delete">
                    <p>Please confirm delete.</p>
                    <div class="buttonContainer-delete">
                        <button onClick={this.props.closePopup}>Cancel</button>
                        <button onClick={this.onSubmit}>Confirm</button>
                    </div>
                </div>
            </div>
        );
    }
}