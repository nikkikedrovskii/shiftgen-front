import React from 'react';
import WordButton from "../../components/button/WordButton";

const ForbiddenWordItem = (props) => {
    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.number}. {props.post.word}</strong>
            </div>
            <div className="post__btns">
                <WordButton onClick={()=>props.remove(props.post)}>Delete</WordButton>
            </div>
        </div>
    );
};

export default ForbiddenWordItem;
