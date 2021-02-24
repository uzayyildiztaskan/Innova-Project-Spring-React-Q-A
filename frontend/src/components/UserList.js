import React, { useState, useEffect } from 'react';
import { getUsers } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';
import UserListItem from './UserListItem';
import { useSelector } from 'react-redux';

const UserList = () => {

    const [page, setPage] = useState({
        content: [],
        size: 3,
        number: 0
    });

    const [loadFailure, setLoadFailure] = useState(false);

    const pendingApiCall = useApiProgress('get', '/api/1.0/users?page');

    const {isLoggedIn} = useSelector((store) => ({
        isLoggedIn: store.isLoggedIn
      }));
    
    useEffect(() => {
        loadUsers();
    }, [isLoggedIn]);

    const onClickNext = () => {
        const nextPage = page.number + 1;
        loadUsers(nextPage);
    }

    const onClickPrevious = () => {
        const previousPage = page.number - 1;
        loadUsers(previousPage);
    }

    const loadUsers = async page => {        
        setLoadFailure(false)
        try{
            const response = await getUsers(page);            
            setPage(response.data);  
        } catch(error) {
            setLoadFailure(true);
        }
    };
    
    const { content : users, last, first } = page;

    let actionDiv = (        
        <div>
            {first == false && <button className = "btn btn-sm btn-light" onClick = {onClickPrevious}>Previous</button>}
            {last == false && <button className = "btn btn-sm btn-light float-right" onClick = {onClickNext}>Next</button>}
        </div>
    );

    if (pendingApiCall) {
        actionDiv = (
            <Spinner />
        );
    }
    
    return (
        <div className = "card">
            <h3 className = "card-header text-center">Users</h3>
            <div className = "list-group-flush">
                {users.map(user => (
                    <UserListItem key = {user.username} user = {user} />
                ))}
            </div>
            {actionDiv}
            {loadFailure && <div className = "text-center text-danger">Load Failure</div>}
        </div>
    );
}

export default UserList;