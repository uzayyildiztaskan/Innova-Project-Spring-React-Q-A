import React from 'react';
import { useSelector } from 'react-redux';
import QuestionFeed from '../components/QuestionFeed';
import SubmitQuestion from '../components/SubmitQuestion';
import UserList from '../components/UserList';

const HomePage = () => {
    const { isLoggedIn } = useSelector(store =>({isLoggedIn: store.isLoggedIn}));
    return (
        <div className = "container">
            <div className = "row">
                <div className = "col">
                    {isLoggedIn && (
                        <>
                            <h5>Sumbit your question:</h5>
                            <div className = "mb-2"> 
                                <SubmitQuestion />
                            </div>
                        </>
                    )}
                    <h5 className = "mt-4">Asked Questions :</h5>
                    <QuestionFeed />
                </div>
                <div className = "col">
                    <UserList />
                </div>
            </div>
        </div>
    );
};

export default HomePage;