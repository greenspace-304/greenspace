import React from 'react';
import './AddToCollectionForm.css';

export class AddToCollectionForm extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            selectedCollection: '',
            collections: []
         }

        this.changeValue = this.changeValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getOptions = this.getOptions.bind(this);
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

    getOptions() {
        return (
            this.state.collections.map((collectionName) => {
                return <option value={collectionName}>{collectionName}</option>
            })
        );
    }

    render() {
        return (
            <div class="popContainer-addToCollection">
                <div class="popContent-addToCollection">
                    <h4 class="title-addToCollection">Add To Collection</h4>
                    <form class="form-addToCollection">
                        <select
                            name="selectedCollection"
                            defaultValue={this.state.lon}
                            onChange={e => this.changeValue(e)}
                            placeholder="Select A Collection" >
                            {this.getOptions()}
                            </select>
                        
                        <div class="buttonContainer-addToCollection">
                            <button onClick={this.props.closePopup}>Cancel</button>
                            <button onClick={e => this.onSubmit(e)}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}