import React, { useState } from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { useSelector } from 'react-redux';
import { deleteAnswer } from '../api/apiCalls';
import Modal from './Modal';
import { useApiProgress } from '../shared/ApiProgress';

const AnswerView = (props) => {
    const loggedInUser = useSelector(store => store.username);
    const { answer, onDeleteAnswer } = props;
    const { user, content, timestamp, id } = answer;
    const { username, displayName, image } = user;
    const { question } = props;
    const { id: questionId } = question; 
    const [modalVisible, setModalVisible] = useState(false);

    const pendingApiCall = useApiProgress('delete', `/api/1.0/questions/${questionId}/answers/${id}`, true);

    const formatted = format(timestamp);

    const onClickDelete = async () => {
        await deleteAnswer(questionId, id);
        onDeleteAnswer(id);
    };

    const onClickCancel = () => {
        setModalVisible(false);
    }
    
    const ownedByLoggedInUser = loggedInUser == username;

    return (
        <>
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
                        <button className = "btn btn-delete-link btn-sm" onClick = {() => setModalVisible(true)}>
                            <span className = "material-icons">delete_outline</span>
                        </button>
                    )}
                </div>
                <div className = "pl-5">
                    {content}
                </div>                
            </div>
            <Modal visible={modalVisible} onClickCancel = {onClickCancel} onClickOk = {onClickDelete} 
                message = {
                    <div>
                        <div>
                            <strong>Are you sure you want to delete the answer?</strong>
                        </div>
                        <span>{content}</span>
                    </div>
                }
                pendingApiCall = {pendingApiCall}
                title = {'Delete Answer'}
                okButton = {'Delete Answer'}
            />
        </>
    );
};

export default AnswerView;