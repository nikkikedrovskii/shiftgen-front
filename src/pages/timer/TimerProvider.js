// TimerContext.js

import React, { createContext, useState, useEffect } from 'react';

const TimerContext = createContext();

const TimerProvider = ({ children }) => {
    const [seconds, setSeconds] = useState(250);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prevSeconds => {
                if (prevSeconds === 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prevSeconds - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <TimerContext.Provider value={seconds}>
            {children}
        </TimerContext.Provider>
    );
};

export { TimerProvider, TimerContext };
