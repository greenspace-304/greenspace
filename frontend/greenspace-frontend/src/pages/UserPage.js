import React from 'react';
import './UserPage.css';

import {QueryGrid} from '../components/QueryGrid';
import {NavLink} from 'react-router-dom';
import {Popup} from '../components/Popup';
import LoginForm from '../components/LoginForm';

export class UserPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userID : 1003,
            headings: ['Info', 'Value'],
            rows:[],
            showLoginForm: false,
            valid: false
        }

    }

    componentDidMount() {
        
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.userID);
        this.setState({
            userID: nextProps.userID,
            valid: nextProps.valid
        });
    }

    toggleLoginFormPopup() {
        this.setState({
            showLoginForm: !this.state.showLoginForm
        })
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
                <div class="buttonContainer-users">
                    <NavLink to="/user-photos" class="navBarLink" style={{ textDecoration: 'none', color: 'white' }}><button class="b-markers-users">My Images</button></NavLink>
                    <NavLink to="/user-collections" class="navBarLink" style={{ textDecoration: 'none', color: 'white' }}><button class="b-markers-users">My Collections</button></NavLink>
                </div>
                {this.state.showLoginForm ?  <LoginForm edit={true}  closePopup={this.toggleLoginFormPopup.bind(this)} onSubmit={this.onSubmitLoginForm.bind(this)} /> : null}
            </div>
            
        );
    }
}