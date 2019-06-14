import React from 'react';
import './NavBar.css';
import Logo from '../images/icons/greenspace_logo.png';
//<div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
import {NavLink} from 'react-router-dom';

//download create browswer history

export class NavBar extends React.Component{
    render() {
        return (
            <div>
                <ul class="navBar">
                    <img class="logo" src={Logo}/>
                    <li class="navBarItemLeft"><NavLink to="/" class="navBarLink">Home</NavLink></li>
                    <li class="navBarItemLeft"><NavLink to="/questionnaire" class="navBarLink">Questionnaire</NavLink></li>
                    <li class="navBarItemLeft"><NavLink to="/photogallery" class="navBarLink">Photos</NavLink></li>
                    <li class="navBarItemLeft"><NavLink to="/map" class="navBarLink">Map</NavLink></li>
                    <li class="navBarItemRight"><NavLink to="/login" class="navBarLink">Login</NavLink></li>
                </ul>
            </div>
        );
    }
}
