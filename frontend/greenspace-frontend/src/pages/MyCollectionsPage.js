import React from 'react';
import './MyCollectionsPage.css';

import {QueryGrid} from '../components/QueryGrid';
import {NewCollectionForm} from '../components/NewCollectionForm';
import {Link} from 'react-router-dom';

export class MyCollectionsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userID: 0,
            headings: ["Collection Name"],
            rows: [["Collection 1 Name"], ['Collection 2 Name']],
            showNewCollectionForm: false
        }
    }

    componentDidMount() {
        //TODO return the list of collections for a user, do not change headings and follow the template for rows

 
    }

    toggleNewCollectionFormPopup() {
        this.setState({
            showNewCollectionForm: !this.state.showNewCollectionForm
        });
    }

    onSubmitNewCollectionForm(buttonState) {
        //TODO insert into table using information from buttonState, collection name will be buttonState.collectionName
    }
    render() {
        return (
            <div class="myCollectionsPageContainer">
                <div class="collections-button"><button id="newCollection" onClick={this.toggleNewCollectionFormPopup.bind(this)}>Collection</button></div>
                <div><QueryGrid headings={this.state.headings} rows={this.state.rows} /></div>
                {this.state.showNewCollectionForm ?  <NewCollectionForm text='Click "Close Button" to hide popup'  closePopup={this.toggleNewCollectionFormPopup.bind(this)} onSubmit={this.onSubmitNewCollectionForm.bind(this)} /> : null}
            </div>
            
        );
    }
}