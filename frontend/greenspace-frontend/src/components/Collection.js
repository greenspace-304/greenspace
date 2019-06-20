import React from 'react';
import './Collection.css';
import {Link} from 'react-router-dom'
import {PlantCard} from './PlantCard';
import {QueryGrid} from './QueryGrid';
import {DeleteForm} from './DeleteForm';
import {AddToCollectionForm} from './AddToCollectionForm';

export class Collection extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            userID: this.props.userID,
            cName: '',
            headings: ["Plant Name ", "Delete"],
            rows: [],
            showAddCollection: false
        }
        
        this.generateCollection = this.generateCollection.bind(this);
    }

    componentDidMount() {
        console.log("YAY");
        console.log(this.props.location.state);

        this.setState({
            userID: this.props.userID,
            cName: this.props.cName
        }, this.generateCollection)

    }
    


    generateCollection() {
        console.log("REACH");
        console.log(this.state.userID);
        console.log(this.props.match.params.cName);
        let name = this.props.match.params.cName;

        let request = { method: 'POST',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "userId": this.state.userID,
            "cName": name
        }),
        };


        fetch('http://localhost:9000/collection/get_plant', request)
        .then( response => response.json())
        .then((data) => {
            console.log("HERE");
            console.log(data);
            let collectionArray = [];
            data.forEach((plant) => {
                let link = `/plants/${plant.plantid}`;
                console.log(plant);

                collectionArray.push([<Link to={{pathname: link, state:{plantID: plant.plantid, userID: this.state.userID}}} style={{textDecoration: 'none', color: 'black'}}>{plant.CommonName}</Link>, 
                    <button value={plant.plantid} onClick={() => this.deleteFromCollection(plant.plantid)}>Delete</button>]);
                this.setState({
                    rows: collectionArray
                })
            })
        })
        .catch((error) => console.error(error));

    }

    deleteFromCollection(plantID){
        let name = this.props.match.params.cName;

        let request = { method: 'POST',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "userId": this.state.userID,
            "cName": name,
            "plantId": plantID
        }),
        };


        fetch('http://localhost:9000/collection/remove_plant', request)
        .then( response => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => console.error(error));

        this.generateCollection();
        
    }

    toggleAddToCollectionFormPopup() {
        console.log("swithc");
        this.setState({
            showAddCollection: !this.state.showAddCollection
        });
    }

    render() {
        return (
            <div class="collection-container">
                <h1>{this.props.match.params.cName}</h1>
                <div class="collection">
                    <div class="collectionsButton"><button onClick={this.toggleAddToCollectionFormPopup.bind(this)}>Add To Collection</button></div>
                    <br></br>
                    <div><QueryGrid headings={this.state.headings} rows={this.state.rows} /></div>
                </div>
                {this.state.showAddCollection ?  <AddToCollectionForm text='Click "Close Button" to hide popup'  closePopup={this.toggleAddToCollectionFormPopup.bind(this)} userID={this.state.userID} cName={this.props.match.params.cName} /> : null}

            </div>
        );
    }
}
