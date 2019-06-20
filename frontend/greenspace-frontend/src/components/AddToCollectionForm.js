import React from 'react';
import './AddToCollectionForm.css';

import {Link} from 'react-router-dom';
import {QueryGrid} from '../components/QueryGrid';

export class AddToCollectionForm extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            selectedCollection: '',
            collections: [],
            userID: 0,
            cName: '',
            headings: ["Plant Name", "Add"],
            rows: []
         }

         this.addToCollection = this.addToCollection.bind(this);
    }


    componentDidMount() {
        this.setState({
            userID: this.props.userID,
            cName: this.props.cName
        }, this.generateOptions)
    }

    generateOptions() {
        let request = { method: 'POST',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "userId": this.state.userID,
            "cName": this.state.cName
        }),
        };


        fetch('http://localhost:9000/collection/availablePlants', request)
        .then( response => response.json())
        .then((data) => {
            console.log('HERE');
            console.log(data);

            let collectionArray = [];
            data.forEach((plant) => {
                let link = `/plants/${plant.plantid}`;

                console.log(plant.commonname);
                collectionArray.push([<Link to={{pathname: link, state:{plantID: plant.plantid, userID: this.state.userID}}} style={{textDecoration: 'none', color: 'black'}}>{plant.commonname}</Link>, 
                    <button value={plant.plantid} onClick={() => this.addToCollection(plant.plantid)}>Add</button>]);
                this.setState({
                    rows: collectionArray
                })
            })
        
        })
        .catch((error) => console.error(error));
    }

    addToCollection(plantID){
        let request = { method: 'POST',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "userId": this.props.userID,
            "cName": this.props.cName,
            "plantId": plantID
        }),
        };


        fetch('http://localhost:9000/collection/add_plant', request)
        .then( response => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => console.error(error));

    }

    render() {
        return (
            <div class="popContainer-addToCollection">
                <div class="popContent-addToCollection">
                    <h4 class="title-addToCollection">Add To Collection</h4>
                    <div class="grid-addToCollection"><QueryGrid headings={this.state.headings} rows={this.state.rows} /></div>
                        <div class="buttonContainer-addToCollection">
                            <button onClick={this.props.closePopup}>Cancel</button>
                        </div>
                    
                </div>
            </div>

        );
    }
}