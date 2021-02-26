import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { postQuestion } from '../api/apiCalls';
import ProfileImageWithDefault from './ProfileImageWithDefault';

const SubmitQuestion = () => {
    const { image } = useSelector((store) => ({image: store.image}));
    const [focused, setFocused] = useState(false);
    const [errors, setErrors] = useState({});
    const [question, setQuestion] = useState('');

    useEffect(() => {
        if(!focused){
            setQuestion('');
            setErrors({});
        }
    }, [focused]);

    useEffect(() => {
        setErrors({});
    }, [question])

    const onClickSubmit = async () => {
        const body = {
            content: question
        };

        try {
            await postQuestion(body);
            setFocused(false);
        } catch (error) {
            if(error.response.data.validationErrors){
                setErrors( error.response.data.validationErrors);
            }
        }
    };

    let textAreaClass = 'form-control';
    if(errors.content) {
        textAreaClass += ' is-invalid';
    }

    return (
        <div className = "card p-1 flex-row">
            <ProfileImageWithDefault image = {image} width = "32" height = "32" className = "rounded-circle mr-1"/>
            <div className = "flex-fill">
                <textarea className = {textAreaClass} rows = {focused ? '3' : '1'} onFocus = {() => setFocused(true)} onChange = {(event) => setQuestion(event.target.value)} value = {question}/>
                <div className="invalid-feedback">{errors.content}</div>
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