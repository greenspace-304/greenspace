import React from 'react';
import './MyCollectionsPage.css';

import {QueryGrid} from '../components/QueryGrid';
import {NewCollectionForm} from '../components/NewCollectionForm';
import {Link} from 'react-router-dom';

export class MyCollectionsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userID: this.props.userID,
            valid: this.props.valid,
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
              let link = `/user-collections/${data[i].cName}`
              newRow.push([<Link to={{pathname: link, state:{cName: data[i].cName, userID: this.state.userID}}} style={{textDecoration: 'none', color: 'black'}}>{data[i].cName}</Link>]);
          }
          this.setState({
            rows: newRow
          })
        })
        .catch((error) => console.error(error));
    }

    componentWillReceiveProps(nextProps) {
      console.log(nextProps.userID);
      this.setState({
          userID: nextProps.userID,
          valid: nextProps.valid
      });
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
          let link = `/user-collections/${buttonState.collectionName}`
          newCollection.push([<Link to={{pathname: link, state:{cName: buttonState.collectionName, userID: this.state.userID}}} style={{textDecoration: 'none', color: 'black'}}>{buttonState.collectionName}</Link>]);
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
