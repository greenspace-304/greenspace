import React from 'react';
import './MarkerForm.css';

export class MarkerForm extends React.Component {
    state = {
        lon: '',
        lat: ''
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
            lon: '',
            lat: ''
        });
    }

    render() {
        return (
            <div class="popContainer-marker">
                <div class="popContent-marker">
                    <h4 class="title-marker">Create New Marker</h4>
                    <form class="form-marker">
                        <input
                            name="lon"
                            type="number"
                            placeholder='Longitude'
                            value={this.state.lon}
                            onChange={e => this.changeValue(e)}
                        />
                        <input
                            name="lat"
                            type="number"
                            placeholder='Latitude'
                            value={this.state.lat}
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