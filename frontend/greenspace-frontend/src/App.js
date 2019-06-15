import React from 'react';
import sakura from './images/icons/sakura.jpg';
import logo from './images/icons/greenspace_logo.png';
import './App.css';
import {NavBar} from './components/NavBar';
import {Footer} from './components/Footer';
import {Photo} from './components/Photo';
import {PhotoGallery} from './components/PhotoGallery';
import {Questionnaire} from './components/Questionnaire';
import {Map} from './components/Map';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


function App() {
  console.log(photoArray);
  return (
    
      <BrowserRouter>
        <NavBar />
        <br></br>
        <Switch>
          <Route path="/" component={Map} exact/>
          <Route path="/photogallery" component={() => <PhotoGallery photos={photoArray} />} />
          <Route path="/questionnaire" component={Questionnaire} />
          <Route path="/map" component={Map} />
        </Switch>
      </BrowserRouter>
      
    
  );
}

export default App;
