import React, { useState } from 'react';
import Input from '../components/Input';  
import ButtonWithProgress from '../components/ButtonWithProgress';  
import { withApiProgress } from '../shared/ApiProgress';
import { connect } from 'react-redux';
import { signupHandler } from '../redux/authActions';

const RegisterUserPage = (props) => {
    const [form, setForm] = useState({
        username: null,
        displayName: null,
        password: null,
        passwordConfirm: null,
    });
    const [errors, setErrors] = useState({});

    const onChange = event => {
        const { name, value} = event.target;
        setErrors((previusErrors) => ({... previusErrors, [name]: undefined }));
        setForm((previousForm) => ({... previousForm, [name]: value}));
        
    };

    const onClickSignUp = async event => {
        event.preventDefault();

        const { history, dispatch } = props;
        const { push } = history;

        const { username, displayName, password } = form;

        const body = {
            username,
            displayName,
            password
        };

        try{
            await dispatch(signupHandler(body));
            push('/');  
        } catch(error){
            if(error.response.data.validationErrors){
                setErrors( error.response.data.validationErrors);
            }
        }
    };

    const { pendingApiCall } = props;
    const { username: usernameError, displayName: displayNameError, password: passwordError } = errors;

    let passwordConfirmError;
    if(form.password != form.passwordConfirm){
        passwordConfirmError = 'Password mismatch'
    }
    
    return(
        <div className = "container">
            <form>
                <h1 className = "text-center">Sign up</h1>
                <Input name = "username" label = "Username" error = {usernameError} onChange = {onChange} />
                <Input name = "displayName" label = "Display Name" error = {displayNameError} onChange = {onChange} />                    
                <Input name = "password" label = "Password" error = {passwordError} onChange = {onChange} type = "password" />
                <Input name = "passwordConfirm" label = "Password Confirm" error = {passwordConfirmError} onChange = {onChange} type = "password" />                    
                <div className = "text-center">
                    <ButtonWithProgress
                    onClick = {onClickSignUp}
                    disabled = {pendingApiCall || passwordConfirmError != undefined }
                    pendingApiCall = {pendingApiCall}
                    text = "Sign Up"
                    />                   
                </div>
            </form>
        </div>
    );
}
const RegisterUserPageWithApiProgressForSignupRequest = withApiProgress(RegisterUserPage, '/api/1.0/users');
const RegisterUserPageWithApiProgressForAuthRequest = withApiProgress(RegisterUserPageWithApiProgressForSignupRequest, '/api/1.0/auth')
export default connect()(RegisterUserPageWithApiProgressForAuthRequest);