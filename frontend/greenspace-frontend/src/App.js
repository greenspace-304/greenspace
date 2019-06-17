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
import {PlantCard} from './components/PlantCard';
import {Collection} from './components/Collection';
import {QueryGrid} from './components/QueryGrid';
import {Home} from './pages/Home';
import {PlantDescription} from './pages/PlantDescription';
import {PhotoGalleryPage} from './pages/PhotoGalleryPage';
import {MapPage} from './pages/MapPage';
import {QuestionnairePage} from './pages/QuestionnairePage';

const headings = [
  'Collection',

];

const rows = [
  [
    'Red and black plaid scarf with thin red stripes and thick black stripes',

  ],
  [
    'Yellow plaid scarf',


  ],
  [
    'Blue plaid scarf',

  ],
  [
    'Pink plaid scarf',


  ],
];

function App() {
  return (
    
      <BrowserRouter>
        <NavBar />
        <br></br>
        <Switch>
          <Route path="/" component={() => <Home />} exact/>
          <Route path="/photogallery" component={() => <PhotoGalleryPage />} />
          <Route path="/questionnaire" component={QuestionnairePage} />
          <Route path="/map" component={MapPage} />
          <Route path="/plants/:id" component={PlantDescription} />
        </Switch>
      </BrowserRouter>
      
    
  );
}

export default App;
