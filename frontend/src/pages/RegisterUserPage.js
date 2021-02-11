import React from 'react';
import { signup } from '../api/apiCalls'
import Input from '../components/Input';    

class RegisterUserPage extends React.Component{

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordConfirm: null,
        pendingApiCall: false,
        errors: {}
    }

    onChange = event => {
        const { name, value} = event.target;
        const errors = { ...this.state.errors };
        errors[name] = undefined;
        this.setState({
            [name] : value,
            errors
        })
    };
    onClickSignUp = async event => {
        event.preventDefault();

        const { username, displayName, password } = this.state;

        const body = {
            username,
            displayName,
            password
        };
        this.setState({pendingApiCall: true});

        try{
            const response = await signup(body);
        } catch(error){
            if(error.response.data.validationErrors){                
            this.setState({ errors : error.response.data.validationErrors });
            }
        }
        
        this.setState({ pendingApiCall: false });
    };

    render(){
        const { pendingApiCall, errors } = this.state;
        const { username, displayName } = errors;

        return(
            <div className = "container">
                <form>
                    <h1 className = "text-center">Sign up</h1>
                    <Input name = "username" label = "Username" error = {username} onChange = {this.onChange} />
                    <Input name = "displayName" label = "Display Name" error = {displayName} onChange = {this.onChange} />
                    
                    <div className = "form-group">
                        <label>Password</label>
                        <input className = "form-control" name = "password" type="password" onChange={this.onChange} />
                    </div>
                    <div className = "form-group">
                        <label>Confirm Password</label>
                        <input className = "form-control" name = "passwordConfirm" type="password" onChange={this.onChange} />
                    </div>
                    <div className = "text-center">
                        <button className = "btn btn-primary" 
                        onClick={this.onClickSignUp}
                        disabled={pendingApiCall}
                        >
                            {pendingApiCall && <span className = "spinner-border spinner-border-sm"></span>}  Sign Up</button>
                    </div>
                </form>
            </div>
        );
    }
}
export default RegisterUserPage;