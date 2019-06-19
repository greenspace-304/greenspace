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
            userID : 1003,
            headings: ['Info', 'Value'],
            rows:[],
            showLoginForm: false
        }

        this.onSubmitLoginForm = this.onSubmitLoginForm.bind(this);
    }

    componentDidMount() {
        this.getUserInfo();
    }

    getUserInfo() {

        fetch(`http://localhost:9000/users/${this.state.userID}`)
        .then(response => response.json())
        .then((data) => {
            console.log(data[0].Username);

            this.setState({
                rows: [['Username', data[0].Username], ['Password', data[0].Password]]
            });
        })
        .catch(err => console.error(err));
    }

    toggleLoginFormPopup() {
        this.setState({
            showLoginForm: !this.state.showLoginForm
        })
    }

    onSubmitLoginForm(newState) {
        
        let newUsername;
        let newPassword;
        if(newState.confirmPassword == newState.password){
            console.log("GOOD PASSWORD");
            
            newUsername = newState.userName;
            newPassword = newState.password;

            console.log(newUsername);
            console.log(newPassword);
            
        };

        let request = { method: 'POST',
                  mode: 'cors',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      "userid": this.state.userID,
                      "username": newUsername,
                      "password": newPassword
                  }),
                };

        
            fetch('http://localhost:9000/users/add', request)
            .then( response => response.json())
            .then(this.getUserInfo)
            .catch((error) => console.error(error));

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
                <div class="userInformationGrid"><QueryGrid headings={this.state.headings} rows={this.state.rows}/></div>
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