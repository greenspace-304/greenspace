import React from 'react';
import './MyCollectionsPage.css';

import {QueryGrid} from '../components/QueryGrid';
import {NewCollectionForm} from '../components/NewCollectionForm';
import {Link} from 'react-router-dom';

export class MyCollectionsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userID: 3,
            headings: ["Collection Name"],
            rows: [["Collection 1 Name"], ['Collection 2 Name']],
            showNewCollectionForm: false
        }
    }

    componentDidMount() {
        fetch(`http://localhost:9000/collection/${this.state.userID}`)
        .then( response => response.json())
        .then( (data) => {
          let newRow = []
          for(let i=0; i < data.length; i++){
              newRow.push([data[i].cName]);
          }
          this.setState({
            rows: newRow
          })
        })
        .catch((error) => console.error(error));
    }

    toggleNewCollectionFormPopup() {
        this.setState({
            showNewCollectionForm: !this.state.showNewCollectionForm
        });
    }

    onSubmitNewCollectionForm(buttonState) {
        let request = {
          method: 'POST',
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: this.state.userID,
            cName: buttonState.collectionName
          }),
          };

        fetch('http://localhost:9000/collection/add', request)
        .then( response => response.json())
        .then( (data) => {
          let newCollection = this.state.rows.slice();
          console.log(newCollection);
          newCollection.push([buttonState.collectionName]);
          console.log(newCollection);
          this.setState({
            rows: newCollection
          })
        })
        .catch((error) => console.error(error));
    }
    render() {
        return (
            <div class="myCollectionsPageContainer">
                <div class="collections-button"><button id="newCollection" onClick={this.toggleNewCollectionFormPopup.bind(this)}>Collection</button></div>
                <div><QueryGrid headings={this.state.headings} rows={this.state.rows} /></div>
                {this.state.showNewCollectionForm ?  <NewCollectionForm text='Click "Close Button" to hide popup' closePopup={this.toggleNewCollectionFormPopup.bind(this)} onSubmit={this.onSubmitNewCollectionForm.bind(this)} /> : null}
            </div>

        );
    }
}
