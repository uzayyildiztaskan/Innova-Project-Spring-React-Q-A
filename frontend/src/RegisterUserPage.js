import React from 'react';
import axios from 'axios';

class RegisterUserPage extends React.Component{

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordConfirm: null
    }

    onChange = event => {

        const { name, value} = event.target;
        this.setState({
            [name] : value
        })
    }
    onClickSignUp = event => {
        event.preventDefault();

        const { username, displayName, password } = this.state;

        const body = {
            username,
            displayName,
            password
        };
        axios.post('/api/1.0/users', body);
    }

    render(){

        return(
            <div className = "container">
                <form>
                    <h1 className = "text-center">Sign up</h1>
                    <div className = "form-group">
                        <label>Username</label>
                        <input className = "form-control" name = "username" onChange={this.onChange} />
                    </div>
                    <div className = "form-group">
                        <label>Display Name</label>
                        <input className = "form-control" name = "displayName" onChange={this.onChange} />
                    </div>
                    <div className = "form-group">
                        <label>Password</label>
                        <input className = "form-control" name = "password" type="password" onChange={this.onChange} />
                    </div>
                    <div className = "form-group">
                        <label>Confirm Password</label>
                        <input className = "form-control" name = "passwordConfirm" type="password" onChange={this.onChange} />
                    </div>
                    <div className = "text-center">
                        <button className = "btn btn-primary" onClick={this.onClickSignUp}>Sign Up</button>
                    </div>
                </form>
            </div>
        );
    }
}
export default RegisterUserPage;