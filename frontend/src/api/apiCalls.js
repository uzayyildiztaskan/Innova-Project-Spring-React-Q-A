import axios from 'axios';

export const signup = (body) => {
    return axios.post('/api/1.0/users', body);   
};

export const login = creds => {
    return axios.post('/api/1.0/auth', creds);
};

export const logout = () => {
    return axios.post('/api/1.0/logout');
};

export const getUsers = (page = 0, size = 3, searchedDisplayName) => {
    return axios.get(`/api/1.0/users?page=${page}&size=${size}&searchedDisplayName=${searchedDisplayName}`);
};

export const setAuthorizationHeader = ({isLoggedIn, token}) => {
    if (isLoggedIn) {
        const authorizationHeaderValue = `Bearer ${token}`;
        axios.defaults.headers['Authorization'] = authorizationHeaderValue;
    }
    else{
        delete axios.defaults.headers['Authorization'];
    }
};

export const getUser = username => {
    return axios.get(`/api/1.0/users/${username}`);
};

export const updateUser = (username, body) => {
    return axios.put(`/api/1.0/users/${username}`, body);
};

export const postQuestion = question => {
    return axios.post('/api/1.0/questions', question);
};

export const getQuestions = (username, page = 0) => {
    const path = username ? `/api/1.0/users/${username}/questions?page=` : '/api/1.0/questions?page=';
    return axios.get(path+ page);
};

export const getOldQuestions = (id, username) => {
    const path = username ? `/api/1.0/users/${username}/questions/${id}` : `/api/1.0/questions/${id}`;
    return axios.get(path);
};
export const getNewQuestionCount = (id, username) => {
    const path = username ? `/api/1.0/users/${username}/questions/${id}?count=true` : `/api/1.0/questions/${id}?count=true`;
    return axios.get(path);
};

export const getNewQuestions = (id, username) => {
    const path = username ? `/api/1.0/users/${username}/questions/${id}?direction=after` : `/api/1.0/questions/${id}?direction=after`;
    return axios.get(path);
};

export const deleteQuestion = id =>{
    return axios.delete(`/api/1.0/questions/${id}`);
};

export const deleteUser = username => {
    return axios.delete(`/api/1.0/users/${username}`);
};

export const postAnswer = (question, id) => {    
    return axios.post(`/api/1.0/questions/${id}/answers`, question);
};

export const getAnswers = (id, page = 0) => {
    const path =`/api/1.0/questions/${id}/answers?page=`;
    return axios.get(path+ page);
};

export const deleteAnswer = (questionId, answerId) => {
    return axios.delete(`/api/1.0/questions/${questionId}/answers/${answerId}`);
};