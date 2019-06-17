import React from 'react';
import './NewCollectionForm.css';

export class NewCollectionForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            collectionName : ''
        }

        this.changeValue = this.changeValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        
    }

    changeValue(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.setState({
            collectionName: ''
        });
    }

    render() {
        return (
            <div class="popContainer-marker">
                <div class="popContent-marker">
                    <h4 class="title-marker">Create New Collection</h4>
                    <form class="form-marker">
                        <input
                            name="collectionName"
                            placeholder="New Collection Name"
                            type="text"
                            value={this.state.lon}
                            onChange={e => this.changeValue(e)}
                        />
                        <div class="buttonContainer-marker">
                            <button onClick={this.props.closePopup}>Cancel</button>
                            <button onClick={e => this.onSubmit(e)}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}