import React, { useState } from 'react';
import Input from '../components/Input';  
import ButtonWithProgress from '../components/ButtonWithProgress';  
import { useApiProgress } from '../shared/ApiProgress';
import { useDispatch } from 'react-redux';
import { signupHandler } from '../redux/authActions';

const RegisterUserPage = (props) => {
    const [form, setForm] = useState({
        username: null,
        displayName: null,
        password: null,
        passwordConfirm: null,
    });
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const onChange = event => {
        const { name, value} = event.target;
        setErrors((previusErrors) => ({... previusErrors, [name]: undefined }));
        setForm((previousForm) => ({... previousForm, [name]: value}));
        
    };

    const onClickSignUp = async event => {
        event.preventDefault();

        const { history } = props;
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

    const { username: usernameError, displayName: displayNameError, password: passwordError } = errors;
    const pendingApiCallSignup = useApiProgress('post', '/api/1.0/users');
    const pendingApiCallLogin = useApiProgress('post', '/api/1.0/auth');

    const pendingApiCall = pendingApiCallLogin || pendingApiCallSignup;

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

export default RegisterUserPage;