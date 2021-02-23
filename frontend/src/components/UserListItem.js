import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImageWithDefault from'./ProfileImageWithDefault';

const UserListItem = (props) => {

    const { user } = props;
    const { username, displayname, image } = user;

    return (
        <Link to = {`/user/${username}`} className = "list-group-item list-group-item-action">
            <ProfileImageWithDefault className = "rounded-circle" width = "32" height = "32" alt = {`${username} profile`} image = {image}/>
            <span className = "pl-2">
                {displayname}@{username}
            </span>
        </Link>
    );
};

export default UserListItem;