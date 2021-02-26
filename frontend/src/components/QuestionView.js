import React from 'react';

const QuestionView = (props) => {
    const { question } = props;
    return (
        <div className = "card p-1">{question.content}</div>
    );
};

export default QuestionView;