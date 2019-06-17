import React from 'react';
import './UserPage.css';

import {QueryGrid} from '../components/QueryGrid';
import {NavLink} from 'react-router-dom';
import {Popup} from '../components/Popup';
import {LoginForm} from '../components/LoginForm';

export class UserPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userID : 0,
            showLoginForm: false
        }

    }

    toggleLoginFormPopup() {
        this.setState({
            showLoginForm: !this.state.showLoginForm
        })
    }

    onSubmitLoginForm() {

    }


    render() {
        const plantHeadings = [
            'Info',
            'Value'
        ];

        const plantRows = [
            [
                'UserName',

                '125'
            ],
            [
                'Password',
                '100'
            ]
        ];
        return (
            <div class="userPageContainer">
                <div class="userInformationGrid"><QueryGrid headings={plantHeadings} rows={plantRows}/></div>
                <div class="editUserButton"><button onClick={this.toggleLoginFormPopup.bind(this)}>Edit User</button></div>
                <div class="buttonContainer-users">
                    <NavLink to="/user-markers" class="navBarLink" style={{ textDecoration: 'none', color: 'white' }}><button class="b-markers-users">My Markers</button></NavLink>
                    <NavLink to="/user-photos" class="navBarLink" style={{ textDecoration: 'none', color: 'white' }}><button class="b-markers-users">My Images</button></NavLink>
                    <NavLink to="/user-bookmarks" class="navBarLink" style={{ textDecoration: 'none', color: 'white' }}><button class="b-markers-users">My Bookmarks</button></NavLink>
                    <NavLink to="/user-collections" class="navBarLink" style={{ textDecoration: 'none', color: 'white' }}><button class="b-markers-users">My Collections</button></NavLink>
                </div>
                {this.state.showLoginForm ?  <LoginForm edit={true}  closePopup={this.toggleLoginFormPopup.bind(this)} onSubmit={this.onSubmitLoginForm.bind(this)} /> : null}
            </div>
            
        );
    }
}