import React from 'react';
import './Collection.css';
import { withRouter } from 'react-router-dom'
import {PlantCard} from './PlantCard';
import {QueryGrid} from './QueryGrid';

export class Collection extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            userID: this.props.userID,
            cName: ''
        }
        
        this.generateCollection = this.generateCollection.bind(this);
    }

    componentDidMount() {
        console.log(this.props.location.state);

        this.setState({
            userID: this.props.userID,
            cName: this.props.cName
        }, this.generateCollection)

    }
    


    generateCollection() {
        console.log("REACH");
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


        fetch('http://localhost:9000/collection/get_plant', request)
        .then( response => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => console.error(error));

    }

    render() {
        return (
            <div>
                <h1>{this.props.collectionName}</h1>
                <div class="collection">
                    
                </div>
            </div>
        );
    }
}
