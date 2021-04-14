import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAnswers } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import AnswerView from './AnswerView';
import Spinner from './Spinner';
import { MDBContainer } from "mdbreact";
import "./scrollbar.css";

const AnswerFeed = (props) => {

    const [answerPage, setAnswerPage] = useState({content: [], last: true, number: 0});
    const { username } = useParams();
    const { question } = props;
    const { id } = question;
    
    const path = `/api/1.0/questions/${id}/answers?page=`;
    const initialAnswerLoadProgress = useApiProgress('get', path);

    useEffect(() => {        
        const loadAnswers = async (page) => {
            try{
                const response = await getAnswers(id, page);
                setAnswerPage(previousAnswerPage => ({
                    ... response.data,
                    content: [... previousAnswerPage.content, ... response.data.content]
                }));
            } catch (error) {
    
            }
        };
        loadAnswers();
    }, [username]);

    const onDeleteAnswerSuccess = id => {
        setAnswerPage(previousAnswerPage => ({
            ... previousAnswerPage,
            content: previousAnswerPage.content.filter(answer => answer.id != id)
        }));
    }

    const { content} = answerPage;

    if(content.length == 0) {
        return <div className = "alert alert-secondary text-center">{initialAnswerLoadProgress ? <Spinner /> : 'There are no answers'}</div>
    }

    const scrollContainerStyle = { width: "500px", maxHeight: "400px"};

    return (
        <MDBContainer>
            <div className="scrollbar scrollbar-primary  mt-5 mx-auto " style={scrollContainerStyle}>
                <div>
                    {content.map(answer => {
                        return <AnswerView key = {answer.id} answer ={answer} onDeleteAnswer = {onDeleteAnswerSuccess} question = {question}/>
                    })}            
                </div>
            </div>
        </MDBContainer>
    );
};

export default AnswerFeed;    