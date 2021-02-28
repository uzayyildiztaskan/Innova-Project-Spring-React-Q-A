import React from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { useSelector } from 'react-redux';
import { deleteQuestion } from '../api/apiCalls';

const QuestionView = (props) => {
    const loggedInUser = useSelector(store => store.username);
    const { question, onDeleteQuestion } = props;
    const { user, content, timestamp, id } = question;
    const { username, displayName, image } = user;

    const formatted = format(timestamp);

    const ownedByLoggedInUser = loggedInUser == username;

    const onClickDelete = async () => {
        await deleteQuestion(id);
        onDeleteQuestion(id);
    }

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
                {ownedByLoggedInUser && (
                    <button className = "btn btn-delete-link btn-sm" onClick = {onClickDelete}>
                        <span className = "material-icons">delete_outline</span>
                    </button>
                )}
            </div>
            <div className = "pl-5">
                {content}
            </div>
        </div>
    );
};

export default QuestionView;