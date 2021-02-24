import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import Input from './Input';
import { updateUser } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';

const ProfileCard = (props) => {
    const [inEditMode, setInEditMode] = useState(false);
    const [updatedDisplayName, setUpdatedDisplayName] = useState();
    const { username: loggedInUsername} = useSelector((store) => ({username: store.username}));
    const routeParams = useParams();
    const pathUsername = routeParams.username;
    const [ user, setUser] = useState({});
    const [editable, setEditable] = useState(false);
    const [newImage, setNewImage] = useState();

    useEffect(() => {
        setUser(props.user)
    }, [props.user]);

    useEffect(() => {
        setEditable(pathUsername == loggedInUsername)
    }, [pathUsername, loggedInUsername]);
    
    const {username, displayName, image } = user;
    
    useEffect(() => {
        if (!inEditMode) {
            setUpdatedDisplayName(undefined);
            setNewImage(undefined);
        } else {
            setUpdatedDisplayName(displayName);
        }
        setUpdatedDisplayName(undefined);
    }, [inEditMode, displayName]);

    const onClickSave = async () => {
        const body = {
            displayName: updatedDisplayName,
            image: newImage.split(',')[1]
        };
        try{
            const response = await updateUser(username, body)
            setInEditMode(false);
            setUser(response.data);
        } catch (error) {}
    };

    const onChangeFile = (event) => {
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result); 
        }
        fileReader.readAsDataURL(file);
    }

    const pendingApiCall = useApiProgress('put', '/api/1.0/users/' + username);

    return (
        <div className = "card text-center">
            <div className = "card-header">
                <ProfileImageWithDefault className = "rounded-circle shadow" width = "200" height = "200" alt = {`${username} profile`} image = {image} tempimage = {newImage}/>
            </div>
            <div className = "card-body">
                {!inEditMode && (
                    <>
                        <h3>
                            {displayName}@{username}
                        </h3>
                        {editable && <button className = "btn btn-success d-inline-flex" onClick = {() => setInEditMode(true)}>
                            <span className = "material-icons">edit</span>
                            Edit
                        </button>}
                    </>
                )}
                {inEditMode && (
                    <div>
                        <Input label = "Change Display Name" defaultValue = {displayName} onChange = {(event) => {setUpdatedDisplayName(event.target.value)}}/>
                        <input type = "file" onChange = {onChangeFile}/>
                        <div>
                            <ButtonWithProgress 
                                className = "btn btn-primary d-inline-flex" 
                                onClick = {onClickSave} 
                                disabled = {pendingApiCall} 
                                pendingApiCall = {pendingApiCall} 
                                text = {
                                <>
                                    <span className = "material-icons">save</span>
                                    Save
                                </>
                                }
                            />                                
                            <button className = "btn btn-light d-inline-flex ml-1" onClick = {() => setInEditMode(false)} disabled = {pendingApiCall}>
                                <span className = "material-icons">close</span>Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileCard;