import React from 'react';
import ForbiddenWordItem from "./ForbiddenWordItem";

const ForbiddenWordList = ({posts, title, remove}) => {
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>{title}</h1>
            {posts.map((post, index) =>
                <ForbiddenWordItem remove={remove} number={index+1} post={post} key={post.id}/>
            )}
        </div>
    );
};

export default ForbiddenWordList;
