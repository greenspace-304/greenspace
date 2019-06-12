import React from 'react';
import './NavBar.css';
import Logo from '../images/icons/greenspace_logo.png';
//<div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
export class NavBar extends React.Component{
    render() {
        return (
            <div>
                <ul class="navBarLeft">
                    <img class="logo" src={Logo}/>
                    <li class="navBarItemLeft">Home</li>
                    <li class="navBarItemLeft">Questionnaire</li>
                    <li class="navBarItemLeft">Photos</li>
                    <li class="navBarItemLeft">Map</li>
                    <li class="navBarItemRight">Log In</li>
                </ul>
            </div>
        );
    }
}
