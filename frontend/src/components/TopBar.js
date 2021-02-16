import React, { Component } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

class TopBar extends Component {
    render() {
        return (
            <div className = "shadow-sm bg-light mb-2">                
                <nav className = "navbar navbar-light bg-light container navbar-expand">
                    <Link className = "navbar-brand" to = "/">
                        <img src = {logo} width = "80" alt = "Askify Logo"/>
                        Askify
                    </Link>

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
                </nav>
            </div>
        );
    }
}

export default TopBar;