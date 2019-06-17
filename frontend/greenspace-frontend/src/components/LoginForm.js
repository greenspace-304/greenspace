import React from 'react';
import {withRouter} from 'react-router-dom';
import './LoginForm.css';

export class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: true,
            userName: '',
            password: '',
            confirmPassword: '',
            userID: 0,
            edit: this.props.edit
        }

        this.changeValue = this.changeValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.updateLogin = this.updateLogin.bind(this);
        this.updateRegister = this.updateRegister.bind(this);
        this.generateButtons = this.generateButtons.bind(this);
        this.generateForm = this.generateForm.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    changeValue(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.props.history.push('/');
    }

    onRegister(e) {
        e.preventDefault();
        this.updateLogin();
    }

    updateLogin() {
        this.setState({
            login: true
        });
    }

    updateRegister() {
        this.setState({
            login: false
        });
    }

    onCancel(e) {
        e.preventDefault();
        this.props.history.push('/');
    }

    onEdit(e) {
        e.preventDefault();
        this.props.closePopup();

    }

    generateForm = () => {
        if (this.state.login && !this.state.edit)
        {
            return(
                    
                        <form class="form-login">
                            <input
                                name="userName"
                                type="text"
                                placeholder='Username'
                                value={this.state.userName}
                                onChange={e => this.changeValue(e)}
                            />
                            <input
                                name="password"
                                type="password"
                                placeholder='Password'
                                value={this.state.password}
                                onChange={e => this.changeValue(e)}
                            />
                            <div class="buttonContainer-login">
                                <button onClick={e => this.onCancel(e)}>Cancel</button>
                                <button onClick={e => this.onSubmit(e)}>Login</button>
                            </div>
                        </form>

                
            );
        }
        else if (this.state.edit)
        {
            console.log(this.state.edit);
            return(
               
                <form class="form-login">
                    <input
                        name="userName"
                        type="text"
                        placeholder='Username'
                        value={this.state.userName}
                        onChange={e => this.changeValue(e)}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder='Password'
                        value={this.state.password}
                        onChange={e => this.changeValue(e)}
                    />
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder='Confirm Password'
                        value={this.state.confirmPassword}
                        onChange={e => this.changeValue(e)}
                    />
                    <div class="buttonContainer-login">
                        <button onClick={this.props.closePopup}>Cancel</button>
                        <button onClick={e => this.onEdit(e)}>Submit</button>
                    </div>
                </form>

            );
        }
        else return (

            <form class="form-login">
            <input
                name="userName"
                type="text"
                placeholder='Username'
                value={this.state.userName}
                onChange={e => this.changeValue(e)}
            />
            <input
                name="password"
                type="password"
                placeholder='Password'
                value={this.state.password}
                onChange={e => this.changeValue(e)}
            />
            <input
                name="confirmPassword"
                type="password"
                placeholder='Confirm Password'
                value={this.state.confirmPassword}
                onChange={e => this.changeValue(e)}
            />
            <div class="buttonContainer-login">
                <button onClick={e => this.onCancel(e)}>Cancel</button>
                <button onClick={e => this.onRegister(e)}>Register</button>
            </div>
        </form>
        );
    }

    generateButtons(){

        const loginStyleWOColour = {
            flexGrow: '1',
            width: '50%',
            borderTopLeftRadius: '10px',
            backgroundColor: 'white',
            borderLeft: 'none',
            borderRight: 'none',
            borderTop: 'none',
            borderBottom: 'none',
            outline: 'none'
        }

        const loginStyleWColour = {
            flexGrow: '1',
            width: '50%',
            borderTopLeftRadius: '10px',
            borderBottom: '1.5px solid blue',
            backgroundColor: 'white',
            borderLeft: 'none',
            borderRight: 'none',
            borderTop: 'none',
            outline: 'none'
        }

        const registerStyleWOColour = {
            flexGrow: '1',
            width: '50%',
            borderTopRightRadius: '10px',
            backgroundColor: 'white',
            borderLeft: 'none',
            borderRight: 'none',
            borderTop: 'none',
            borderBottom: 'none',
            outline: 'none'
        }

        const registerStyleWColour = {
            flexGrow: '1',
            width: '50%',
            borderTopRightRadius: '10px',
            borderBottom: '1.5px solid blue',
            backgroundColor: 'white',
            borderLeft: 'none',
            borderRight: 'none',
            borderTop: 'none',
            outline: 'none'
        }

        const onlyLoginStyle = {
            flexGrow: '1',
            width: '100%',
            borderTopRightRadius: '10px',
            borderTopLeftRadius: '10px',
            borderBottom: '1.5px solid blue',
            backgroundColor: 'white',
            borderLeft: 'none',
            borderRight: 'none',
            borderTop: 'none',
            outline: 'none'
        }

        if(!this.state.edit)
        {
            return(
                <div class="loginRegister">
                    <button onClick={this.updateLogin} style={this.state.login ? loginStyleWColour: loginStyleWOColour}>Login</button>
                    <button onClick={this.updateRegister} style={this.state.login ? registerStyleWOColour: registerStyleWColour}>Register</button>
                </div>
            );
        }
        else return(
            <div class="loginRegister">
                <button onClick={this.updateLogin} style={onlyLoginStyle}>Edit</button>
            </div>
        );
    }
    render(){


        
        return (
                <div class="popContainer-login">
                    <div class="popContent-login">
                    {this.generateButtons()}
                    {this.generateForm()}
                    </div>
                </div>
        );
    }
}