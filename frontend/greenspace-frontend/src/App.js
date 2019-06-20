import React from 'react';
import './App.css';
import {NavBar} from './components/NavBar';
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';
import {Collection} from './components/Collection';
import {Home} from './pages/Home';
import {PlantDescription} from './pages/PlantDescription';
import {PhotoGalleryPage} from './pages/PhotoGalleryPage';
import {MapPage} from './pages/MapPage';
import {QuestionnairePage} from './pages/QuestionnairePage';
import {UserPage} from './pages/UserPage';
import {MyCollectionsPage} from './pages/MyCollectionsPage';
import {MyImagesPage} from './pages/MyImagesPage';
import {MyBookmarksPage} from './pages/MyBookmarksPage';
import LoginForm from './components/LoginForm';
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
    console.log("LOGIN");
    console.log(buttonState);
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
              }, console.log(this.state));
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
          <Route path="/login" render={(props) => <LoginForm {...props} edit={false} onSubmit={this.onSubmitLoginForm} onRegister={this.onRegisterLoginForm} userID={this.state.userID} valid={this.state.valid} /> } />
          <Route path="/" render={(props) => <Home {...props} userID={this.state.userID} valid={this.state.valid}/>} exact/>
          <Route path="/photogallery" render={(props) => <PhotoGalleryPage {...props} userID={this.state.userID} valid={this.state.valid} /> } />
          <Route path="/questionnaire" render={(props) => <QuestionnairePage {...props} userID={this.state.userID} valid={this.state.valid} />} />
          <Route path="/plants/:id" render={(props) => <PlantDescription {...props} userID={this.state.userID} valid={this.state.valid}/>} />
          <Route path="/user" render={(props) => <UserPage {...props} userID={this.state.userID} valid={this.state.valid} />} />
          <Route path="/user-collections" render={(props) => <MyCollectionsPage {...props} userID={this.state.userID} valid={this.state.valid} />} />
          <Route path="/collections/:cName" render={(props) => <Collection {...props} userID={this.state.userID} valid={this.state.valid} />} />
          <Route path="/user-photos" render={(props) => <MyImagesPage  {...props} userID={this.state.userID} valid={this.state.valid} />} />
          <Route path="/user-bookmarks" render={(props) => <MyBookmarksPage {...props} userID={this.state.userID} valid={this.state.valid} />} />
        </Switch>
      </BrowserRouter>

    
    );
  }
}

export default App;
