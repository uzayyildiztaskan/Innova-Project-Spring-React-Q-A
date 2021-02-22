import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../redux/authActions';

const TopBar = (props) => {

    const {username, isLoggedIn} = useSelector((store) => ({     
            isLoggedIn: store.isLoggedIn,
            username: store.username        
        }));

    const dispatch = useDispatch();

    const onLogoutSuccess = () => {
        dispatch(logoutSuccess());
    }

        let links = (
            <ul className = "navbar-nav ml-auto">
                <li>
                    <Link className = "nav-link" to = "/login">
                        Login
                    </Link>
                </li>
                <li>
                    <Link className = "nav-link" to = "/signup">
                        Sign Up
                    </Link>
                </li>
            </ul>
            );
        if (isLoggedIn) {
            links = (
                <ul className = "navbar-nav ml-auto">
                    <li>
                        <Link className = "nav-link" to = {`/user/${username}`}>
                            {username}
                        </Link>
                    </li>
                    <li className = "nav-link" onClick = {onLogoutSuccess} style = {{cursor: 'pointer'}}>Logout</li>
                </ul>
            );
        }

        return (
            <div className = "shadow-sm bg-light mb-2">                
                <nav className = "navbar navbar-light bg-light container navbar-expand">
                    <Link className = "navbar-brand" to = "/">
                        <img src = {logo} width = "80" alt = "Askify Logo"/>
                        Askify
                    </Link>
                    {links}                    
                </nav>
            </div>
        );
}

export default TopBar;