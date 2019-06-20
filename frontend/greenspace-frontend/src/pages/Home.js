import React from 'react';
import './Home.css';

import {QueryGrid} from '../components/QueryGrid';
import {PhotoGallery} from '../components/PhotoGallery';
import {Photo} from '../components/Photo';
import {PlantDescription} from './PlantDescription';
import sakura from '../images/icons/sakura.jpg'
import {Link} from 'react-router-dom';


export class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            headings: [],
            rows: [],
            firstPlacePhoto: '',
            firstPlaceCaption: '',
            photoArray: [],
            topMonthly: true,
            topLove: false,
            topAll: false,
            topMonthlyHeadings: ["Plant Name", "Times Added"],
            topMonthlyRows: [],
            topLoveHeadings: ["Plant Name"],
            topLoveRows: [],
            topAllHeadings: ["Plant Name"],
            topAllRows: [],
            userID: 0
        }

        this.showLovedByAll = this.showLovedByAll.bind(this);
        this.showTopAll = this.showTopAll.bind(this);
        this.showTopMonthly = this.showTopMonthly.bind(this);
    }

    componentDidMount() {
        console.log("HOME");
        console.log(this.state.userID);
        console.log(this.state.valid);
        this.getTopMonthlyInfo();
        this.getAllLoveInfo();
        this.getTopAll();
    }

    getTopMonthlyInfo() {
        fetch(`http://localhost:9000/home/monthly_plant`)
        .then(response => response.json())
        .then((data) => {let rowArray = data.map((plant) => {
                console.log("MonthlyPLant")
                console.log(plant)
                let link = `/plants/${plant.PlantID}`;

                return [<Link to={{pathname: link, state:{plantID: plant.PlantID, userID: this.state.userID}}} style={{textDecoration: 'none', color: 'black'}}>{plant.PlantName}</Link>, plant.TimesAdded];
            });

            this.setState({
                topMonthlyRows: rowArray
            })
        })
        .catch(err => console.error(err));

        fetch(`http://localhost:9000/home/monthly_photo`)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            this.setState({
                firstPlacePhoto: data[0].PhotoPath,
                firstPlaceCaption: data[0].Caption
            })
        })
        .catch(err => console.error(err));

    }

    getAllLoveInfo() {
        fetch(`http://localhost:9000/home/most_collected`)
        .then(response => response.json())
        .then((data) => {
            let rowArray = data.map((plant) => {
                let link = `/plants/${plant.plantid}`;
                return [<Link to={{pathname: link, state:{plantID: plant.plantid, userID: this.state.userID}}} style={{textDecoration: 'none', color: 'black'}}>{plant.CommonName}</Link>];
            });

            this.setState({
                topLoveRows: rowArray
            })
        })
        .catch(err => console.error(err));
    }

    getTopAll() {
        fetch(`http://localhost:9000/home/most_popular`)
        .then(response => response.json())
        .then((data) => {
            let plant = data[0];
            console.log("most popular")
            console.log(plant)
            this.setState({
                topAllRows: [[<Link to={{pathname: `/plants/${plant.plantID}`, state:{plantID: plant.plantID, userID: this.state.userID}}} style={{textDecoration: 'none', color: 'black'}}>{data[0].CommonName}</Link>]]
            });
        })
        .catch(err => console.error(err));
    }

    getRecentPhotos = () => {
      fetch(`http://localhost:9000/home/recent_photos`)
      .then(response => response.json())
      .then((data) => {
          let plant = data[0];

          this.setState({
              topAllRows: [[<Link to={{pathname: `/plants/${plant.plantID}`, state:{plantID: plant.plantid, userID: this.state.userID}}} style={{textDecoration: 'none', color: 'black'}}>{data[0].CommonName}</Link>]]
          });
      })
      .catch(err => console.error(err));
    }

    showTopMonthly() {
        this.setState({
            topMonthly: true,
            topLove: false,
            topAll: false
        })
    }

    showLovedByAll() {
        this.setState({
            topMonthly: false,
            topLove: true,
            topAll: false
        })
    }

    showTopAll() {
        this.setState({
            topMonthly: false,
            topLove: false,
            topAll: true
        })
    }

    renderGrid() {
        if(this.state.topMonthly){
            return (<QueryGrid headings={this.state.topMonthlyHeadings} rows={this.state.topMonthlyRows} />);
        }
        else
        if(this.state.topLove){
            return (<QueryGrid headings={this.state.topLoveHeadings} rows={this.state.topLoveRows} />);
        }
        else
            return (<QueryGrid headings={this.state.topAllHeadings} rows={this.state.topAllRows} />);
    }

    render() {

        return (

                <div class="homePage">
                <div class="topPlants">
                    <h2>Top Plants of the Month</h2>
                    <div><Photo photo={this.state.firstPlacePhoto} caption={this.state.firstPlaceCaption} height="600px" width="800px" /></div>
                    <div class="home-buttonContainer">
                        <button id="topMonthly" onClick={this.showTopMonthly}>Top Monthly</button>
                        <button id="topLove" onClick={this.showLovedByAll}>Loved By All</button>
                        <button id="topAll" onClick={this.showTopAll}>Top All Time</button>
                    </div>
                    <div class="home-grid">{this.renderGrid()}</div>
                </div>
            </div>

        );

    }
}
