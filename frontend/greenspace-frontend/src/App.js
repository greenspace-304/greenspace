import React from 'react';
import {Redirect} from 'react-router-dom';
import sakura from './images/icons/sakura.jpg';
import logo from './images/icons/greenspace_logo.png';
import './App.css';
import {NavBar} from './components/NavBar';
import {Footer} from './components/Footer';
import {Photo} from './components/Photo';
import {PhotoGallery} from './components/PhotoGallery';
import {Questionnaire} from './components/Questionnaire';
import {Map} from './components/Map';
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';
import {PlantCard} from './components/PlantCard';
import {Collection} from './components/Collection';
import {QueryGrid} from './components/QueryGrid';
import {Home} from './pages/Home';
import {PlantDescription} from './pages/PlantDescription';
import {PhotoGalleryPage} from './pages/PhotoGalleryPage';
import {MapPage} from './pages/MapPage';
import {QuestionnairePage} from './pages/QuestionnairePage';
import {UserPage} from './pages/UserPage';
import {MyCollectionsPage} from './pages/MyCollectionsPage';
import {MyMarkersPage} from './pages/MyMarkersPage';
import {MyImagesPage} from './pages/MyImagesPage';
import {MyBookmarksPage} from './pages/MyBookmarksPage';
import LoginForm from './components/LoginForm';
import {DeleteForm} from './components/DeleteForm';
import localStorage from 'local-storage';



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userID: localStorage.get('userID'),
      valid: localStorage.get('valid')
    }

    this.onSubmitLoginForm = this.onSubmitLoginForm.bind(this);
  }

  componentDidMount() {
    this.setState({
      userID: localStorage.get('userID'),
      valid: localStorage.get('valid')
    });
  }

  onSubmitLoginForm(buttonState) {

    let loginRequest = { method: 'POST',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  "username": buttonState.userName,
                  "password": buttonState.password
              }),
    };

    fetch('http://localhost:9000/users/auth', loginRequest)
        .then( response => response.json())
        .then((data) => {
            
            if(data.length === 0){
              alert("Sorry, this username or password is incorrect!");
            }
            else {
              console.log(data[0].USERID);
              this.setState({
                userID: data[0].USERID,
                valid: 1
              });
              localStorage.setItem('userID', data[0].USERID);
              localStorage.setItem('valid', 1);
            }        
        })
        .catch((error) => console.error(error));
  }

  onRegisterLoginForm(buttonState) {

    console.log(buttonState);
    let request = { method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "username": buttonState.userName,
        "password": buttonState.password
      }),
    };


    fetch('http://localhost:9000/users/add', request)
    .then( response => response.json())
    .then(this.getUserInfo)
    .catch((error) => console.error(error));
  }

  render() {
    console.log("RENDER");
    console.log("")
        return (

      <BrowserRouter>
        <NavBar />
        <br></br>
        <Switch>
          <Route path="/login" component={() => <LoginForm edit={false} onSubmit={this.onSubmitLoginForm} onRegister={this.onRegisterLoginForm} userID={this.state.userID} valid={this.state.valid} /> } />
          <Route path="/" component={() => <Home />} exact/>
          <Route path="/photogallery" component={() => <PhotoGalleryPage userID={this.state.userID} valid={this.state.valid} /> } />
          <Route path="/questionnaire" component={() => <QuestionnairePage userID={this.state.userID} valid={this.state.valid} />} />
          <Route path="/map" component={() => <MapPage userID={this.state.userID} valid={this.state.valid} />} />
          <Route path="/plants/:id" component={() => <PlantDescription userID={this.state.userID} valid={this.state.valid} />} />
          <Route path="/user" component={() => <UserPage userID={this.state.userID} valid={this.state.valid} />} />
          <Route path="/user-collections" component={() => <MyCollectionsPage userID={this.state.userID} valid={this.state.valid} />} />
          <Route path="/user-collections/:id" component={() => <Collection userID={this.state.userID} valid={this.state.valid} />} />
          <Route path="/user-photos" component={() => <MyImagesPage  userID={this.state.userID} valid={this.state.valid} />} />
          <Route path="/user-bookmarks" component={() => <MyBookmarksPage userID={this.state.userID} valid={this.state.valid} />} />
        </Switch>
      </BrowserRouter>

    
    );
  }
}

export default App;
