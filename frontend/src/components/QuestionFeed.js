import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNewQuestionCount, getNewQuestions, getOldQuestions, getQuestions } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import QuestionView from './QuestionView';
import Spinner from './Spinner';

const QuestionFeed = () => {

    const [questionPage, setQuestionPage] = useState({content: [], last: true, number: 0});
    const [newQuestionCount, setNewQuestionCount] = useState(0);
    const { username } = useParams();
    
    const path = username ? `/api/1.0/users/${username}/questions?page=` : '/api/1.0/questions?page=';
    const initialQuestionLoadProgress = useApiProgress('get', path);
    
    let lastQuestionId = 0;
    let firstQuestionId = 0;
    if (questionPage.content.length > 0){

        firstQuestionId = questionPage.content[0].id;

        const lastQuestionIndex = questionPage.content.length - 1;
        lastQuestionId = questionPage.content[lastQuestionIndex].id;
    }

    const oldQuestionPath = username ? `/api/1.0/users/${username}/questions/${lastQuestionId}` : `/api/1.0/questions/${lastQuestionId}`;
    const loadOldQuestionsProgress = useApiProgress('get', oldQuestionPath, true);

    const newQuestionPath = username ? `/api/1.0/users/${username}/questions/${firstQuestionId}?direction=after` : `/api/1.0/questions/${firstQuestionId}?direction=after`;

    const loadNewQuestionsProgress = useApiProgress('get', newQuestionPath, true);
    
    useEffect(() => {
        const getCount = async () => {
            const response = await getNewQuestionCount(firstQuestionId, username);
            setNewQuestionCount(response.data.count);
        }
        let looper = setInterval(getCount, 1000);
        return function cleanup() {
            clearInterval(looper);
        }
    }, [firstQuestionId, username]);

    useEffect(() => {        
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
        loadQuestions();
    }, [username]);


    const loadOldQuestions = async() => {
        const response = await getOldQuestions(lastQuestionId, username);
        setQuestionPage(previousQuestionPage => ({
            ... response.data,
            content: [... previousQuestionPage.content, ... response.data.content]
        }));
    }

    const loadNewQuestions = async () => {
        const response = await getNewQuestions(firstQuestionId, username);
        setQuestionPage(previousQuestionPage => ({
            ... previousQuestionPage,
            content: [... response.data, ... previousQuestionPage.content]
        }));
        setNewQuestionCount(0);
    }

    const { content, last} = questionPage;

    if(content.length == 0) {
        return <div className = "alert alert-secondary text-center">{initialQuestionLoadProgress ? <Spinner /> : 'There are no questions'}</div>
    }

    return (
        <div>
            {newQuestionCount > 0 && (
                <div className = "alert alert-secondary text-center mb-1" style = {{cursor: loadNewQuestionsProgress ? 'not-allowed' : 'pointer'}} onClick = {loadNewQuestionsProgress ? () => {} : loadNewQuestions}>{loadNewQuestionsProgress ? <Spinner /> : 'There are new questions'}</div>
            )}
            {content.map(question => {
                return <QuestionView key = {question.id} question ={question} />
            })}
            {!last && (
                <div className = "alert alert-secondary text-center" style = {{cursor: loadOldQuestionsProgress ? 'not-allowed' : 'pointer'}} onClick = {loadOldQuestionsProgress ? () => {} : loadOldQuestions}>
                    {loadOldQuestionsProgress ? <Spinner /> : 'Load old questions'}
                </div>
            )} 
        </div>
    );
};

export default QuestionFeed;    