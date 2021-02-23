import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import defaultPicture from '../assets/profile.png';

const ProfileCard = (props) => {
    const { username: loggedInUsername} = useSelector((store) => ({username: store.username}));
    const routeParams = useParams();

    const { user } = props;
    const {username, displayName, image } = user;
    const pathUsername = routeParams.username;
    let message = "Edit disabled";

    let imageSource = defaultPicture;
    if(image) {
        imageSource = image;
    } 

    if (pathUsername == loggedInUsername) {
        message = "Edit enabled";
    }
    return (
        <div className = "card text-center">
            <div className = "card-header">
                <img className = "rounded-circle shadow" width = "200" height = "200" alt = {`${username} profile`} src = {imageSource}/>
            </div>
            <div className = "card-body">
                <h3>
                    {displayName}@{username}
                </h3>
            </div>
        </div>
    );
};

export default ProfileCard;