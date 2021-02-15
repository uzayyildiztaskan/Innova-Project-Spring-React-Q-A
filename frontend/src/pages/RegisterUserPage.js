import React from 'react';
import { signup } from '../api/apiCalls'
import Input from '../components/Input';  
import ButtonWithProgress from '../components/ButtonWithProgress';  

class RegisterUserPage extends React.Component{

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordConfirm: null,
        errors: {}
    }

    onChange = event => {
        const { name, value} = event.target;
        const errors = { ...this.state.errors };
        errors[name] = undefined;
        if( name == 'password' || name == 'passwordConfirm'){
            if(name == 'password' && value != this.state.passwordConfirm){
                errors.passwordConfirm = 'Password mismatch';
            } else if (name == 'passwordConfirm' && value != this.state.password){
                errors.passwordConfirm = 'Password mismatch';
            } else{
                errors.passwordConfirm = undefined;
            }
        }
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

        try{
            const response = await signup(body);
        } catch(error){
            if(error.response.data.validationErrors){                
            this.setState({ errors : error.response.data.validationErrors });
            }
        }
    };

    render(){
        const { pendingApiCall } = this.props;
        const { errors } = this.state;
        const { username, displayName, password, passwordConfirm } = errors;

        return(
            <div className = "container">
                <form>
                    <h1 className = "text-center">Sign up</h1>
                    <Input name = "username" label = "Username" error = {username} onChange = {this.onChange} />
                    <Input name = "displayName" label = "Display Name" error = {displayName} onChange = {this.onChange} />                    
                    <Input name = "password" label = "Password" error = {password} onChange = {this.onChange} type = "password" />
                    <Input name = "passwordConfirm" label = "Password Confirm" error = {passwordConfirm} onChange = {this.onChange} type = "password" />                    
                    <div className = "text-center">
                        <ButtonWithProgress
                        onClick = {this.onClickSignUp}
                        disabled = {pendingApiCall || passwordConfirm != undefined }
                        pendingApiCall = {pendingApiCall}
                        text = "Sign Up"
                        />                   
                    </div>
                </form>
            </div>
        );
    }
}
export default RegisterUserPage;