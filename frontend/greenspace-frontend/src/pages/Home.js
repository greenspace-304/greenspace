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
            photoArray: [] /*Top 10 most recent photos */

        }
    }


    render() {

        const plantHeadings = [
            'Plant Name',
            'Likes'
        ];

        const plantRows = [
            [
                <Link to="/plants/sakura"  style={{ textDecoration: 'none', color: 'black' }}>Sakura</Link>,

                '125'
            ],
            [
                'Ginko',
                '100'
            ],
            [
                'Maple',
                '98'
            ],
            [
                'Pine',
                '50'
            ],
            [
                'Fir',
                '15'
            ],
        ];

        return (

                <div class="homePage">
                <div class="topPlants">
                    <h2>Top Plants of the Month</h2>
                    <div><Photo photo={sakura} caption="Sakura" height="600px" width="800px" /></div>
                    <div><QueryGrid headings={plantHeadings} rows={plantRows} /></div>
                </div>
                <div class="homePage-photos">
                    <h2>Recent Photos</h2>
                    <div>PhotoGallery {/*<PhotoGallery photos={photoArray} /> */} </div>
                </div>
            </div>

        );

    }
}