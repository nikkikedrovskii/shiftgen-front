import React from 'react';

const WordButton = ({children, ...props}) => {
    return (
        <button {...props} className={'btn btn-primary ${classes.myBtn}'}>
            {children}
        </button>
    );
};

export default WordButton;
