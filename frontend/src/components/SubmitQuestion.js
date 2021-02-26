import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { postQuestion } from '../api/apiCalls';
import ProfileImageWithDefault from './ProfileImageWithDefault';

const SubmitQuestion = () => {
    const { image } = useSelector((store) => ({image: store.image}));
    const [focused, setFocused] = useState(false);
    const [question, setQuestion] = useState('');

    useEffect(() => {
        if(!focused){
            setQuestion('');
        }
    }, [focused]);

    const onClickSubmit = async () => {
        const body = {
            content: question
        }

        try {
            await postQuestion(body)
        } catch (error) {

        }
    };

    return (
        <div className = "card p-1 flex-row">
            <ProfileImageWithDefault image = {image} width = "32" height = "32" className = "rounded-circle mr-1"/>
            <div className = "flex-fill">
                <textarea className = "form-control" rows = {focused ? '3' : '1'} onFocus = {() => setFocused(true)} onChange = {(event) => setQuestion(event.target.value)} value = {question}/>
                {focused && (
                    <div className = "text-right mt-1">
                        <button className = "btn btn-primary" onClick = {onClickSubmit}>Submit</button>
                        <button className = "btn btn-light d-inline-flex ml-1" onClick = {() => setFocused(false)}>
                            <span className = "material-icons">close</span>Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubmitQuestion;