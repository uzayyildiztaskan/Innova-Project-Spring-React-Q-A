import React from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';

const QuestionView = (props) => {
    const { question } = props;
    const { user, content, timestamp } = question;
    const { username, displayName, image } = user;

    const formatted = format(timestamp);

    return (
        <div className = "card p-1">
            <div className = "d-flex">
                <ProfileImageWithDefault image = {image} width = "32" height = "32" className = "rounded-circle m-1"/>
                <div className = "flex-fill m-auto pl-2">
                    <Link to = {`/user/${username}`}>
                        <h6 className = "d-inline">{displayName}@{username}</h6>
                        <span> - </span>
                        <span>{formatted}</span>
                    </Link>
                </div>
            </div>
            <div className = "pl-5">
                {content}
            </div>
        </div>
    );
};

export default QuestionView;