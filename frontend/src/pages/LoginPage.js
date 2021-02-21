import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { withApiProgress } from '../shared/ApiProgress';
import { connect } from 'react-redux';
import { loginHandler, loginSuccess } from '../redux/authActions';

const LoginPage = (props) => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        setError(undefined);
    }, [username, password])

    const onClickLogin = async event => {
        event.preventDefault();
        const creds = {
            username,
            password
        };
        
        const { history, dispatch } = props;
        const { push } = history;

        setError(undefined);
        try {
            await dispatch(loginHandler(creds))
            push('/');
        } catch(apiError) {
            setError(apiError.response.data.message);
        }        
    };

    const { pendingApiCall } = props;
    const buttonEnabled = username && password;

    return (
        <div className = "container">
            <form>
                <h1 className = "text-center">Login</h1>
                <Input label = "Username" onChange = {(event) => setUsername(event.target.value)} />
                <Input label = "Password" type = 'password' onChange = {event => setPassword(event.target.value)} />
                {error && <div className = "alert alert-danger">{error}</div>}
                <div className = "text-center">
                    <ButtonWithProgress 
                    onClick = {onClickLogin} 
                    disabled = {!buttonEnabled || pendingApiCall }
                    pendingApiCall = { pendingApiCall }
                    text = "Login" 
                    />
                </div>                    
            </form>                
        </div>
    );
}

export default connect()(withApiProgress(LoginPage, '/api/1.0/auth'));