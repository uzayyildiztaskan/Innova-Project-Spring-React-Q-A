import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../redux/authActions';
import ProfileImageWithDefault from './ProfileImageWithDefault';

const TopBar = (props) => {

    const { username, isLoggedIn, displayName, image } = useSelector((store) => ({     
            isLoggedIn: store.isLoggedIn,
            username: store.username,
            displayName: store.displayName,
            image: store.image        
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
                    <li className = "nav-item dropdown">
                        <div className = "d-flex" style = {{cursor: 'pointer'}}>
                            <ProfileImageWithDefault image = {image} width = "32" height = "32" className = "rounded-circle m-auto" />
                            <span className = "nav-link dropdown-toggle">{displayName}</span>
                        </div>
                        <div className = "dropdown-menu show p-0 shadow">
                            <Link className = "dropdown-item d-flex p-2" to = {`/user/${username}`}>
                            <span className = "material-icons text-info mr-2">person</span>
                                My Profile
                            </Link>
                            <span className = "dropdown-item d-flex p-2" onClick = {onLogoutSuccess} style = {{cursor: 'pointer'}}>
                                <span className = "material-icons text-danger mr-2">power_settings_new</span>
                                Logout
                            </span>
                        </div>
                    </li>
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