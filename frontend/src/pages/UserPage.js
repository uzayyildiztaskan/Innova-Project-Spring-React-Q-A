import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import { getUser } from '../api/apiCalls';
import { useParams } from 'react-router-dom';

const UserPage = () => {
    const [user, setUser] = useState();
    const [notFound, setNotFound] = useState(false);

    const { username } = useParams();

    useEffect(() => {
        setNotFound(false);
    }, [user]);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await getUser(username);
                setUser(response.data);
            }catch(error) {
                setNotFound(true);
            }
        };
        loadUser();
    }, [username]);

    if (notFound) {
        return (
            <div className = "container">
                <div className = "alert alert-danger text-center">
                    <div>
                    <span className = "material-icons" style = {{fontsize: '48px'}}>error</span>
                    </div>
                    User not found
                </div>            
            </div>
        );
    }

    return (
        <div className = "container">
            <ProfileCard />
        </div>
    );
};

export default UserPage;