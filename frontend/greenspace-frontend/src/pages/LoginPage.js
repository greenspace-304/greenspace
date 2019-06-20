import React from 'react';

import {LoginFrom} from '../components/LoginForm';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            toggleLoginFormPopup: false
        });
    }

    toggleLoginFormPopup() {
        this.setState({
            toggleLoginFormPopup: !this.toggleLoginFormPopup
        })
    }

    onSubmitLoginForm(buttonState) {
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
                
                console.log(data);
                
            })
            .catch((error) => console.error(error));
    }

    onRegisterLoginForm(buttonState) {

    }

    render() {
        return(
            <div><LoginForm edit={false} closePopup={this.toggleLoginFormPopup.bind(this)} onSubmit={this.onSubmitLoginForm.bind(this)} onRegister={this.onRegisterLoginForm.bind(this)} /></div>
        );
    }
}