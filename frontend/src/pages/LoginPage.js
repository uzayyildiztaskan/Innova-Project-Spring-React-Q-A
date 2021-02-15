import React, { Component } from 'react';
import Input from '../components/Input';
import { login } from '../api/apiCalls';

class LoginPage extends Component {

    state = {
        username: null,
        password: null,
        error: null
    };

    onChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name] : value,
            error: null
        });
    };

    onClickLogin = async event => {
        event.preventDefault();
        const {username, password } = this.state;
        const creds = {
            username,
            password
        };
        this.setState({
            error: null
        });
        try {
            await login(creds)
        } catch(apiError) {
            this.setState({
                error: apiError.response.data.message 
            })
        }        
    };

    render() {

        const { username, password, error } = this.state;
        const buttonEnabled = username && password;

        return (
            <div className = "container">
                <form>
                    <h1 className = "text-center">Login</h1>
                    <Input label = "Username" name = "username" onChange = {this.onChange} />
                    <Input label = "Password" name = "password" type = 'password' onChange = {this.onChange} />
                    {error && <div className = "alert alert-danger">{error}</div>}
                    <div className = "text-center">
                        <button className = "btn btn-primary" 
                        onClick = {this.onClickLogin}
                        disabled = {!buttonEnabled}>
                            Login
                        </button>
                    </div>                    
                </form>                
            </div>
        );
    }
}

export default LoginPage;