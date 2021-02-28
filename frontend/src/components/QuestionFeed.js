import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestions } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import QuestionView from './QuestionView';
import Spinner from './Spinner';

const QuestionFeed = () => {

    const [questionPage, setQuestionPage] = useState({content: [], last: true, number: 0});
    
    const { username } = useParams();
    
    const path = username ? `/api/1.0/users/${username}/questions?page=` : '/api/1.0/questions?page=';
    const pendingApiCall = useApiProgress('get', path);
    
    useEffect(() => {        
        loadQuestions();
    }, []);

    const loadQuestions = async (page) => {
        try{
            const response = await getQuestions(username, page);
            setQuestionPage(previousQuestionPage => ({
                ... response.data,
                content: [... previousQuestionPage.content, ... response.data.content]
            }));
        } catch (error) {

        }
    };

    const { content, last, number } = questionPage;

    if(content.length == 0) {
        return <div className = "alert alert-secondary text-center">{pendingApiCall ? <Spinner /> : 'There are no questions'}</div>
    }

    return (
        <div>
            {content.map(question => {
                return <QuestionView key = {question.id} question ={question} />
            })}
            {!last && (
                <div className = "alert alert-secondary text-center" style = {{cursor: pendingApiCall ? 'not-allowed' : 'pointer'}} onClick = {pendingApiCall ? () => {} : () => loadQuestions(number + 1)}>
                    {pendingApiCall ? <Spinner /> : 'Load old questions'}
                </div>
            )} 
        </div>
    );
};

export default QuestionFeed;    