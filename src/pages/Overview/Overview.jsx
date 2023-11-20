import React from 'react';
import Strategy from "../../components/strategy/Strategy";
import {useState} from "react";
import {useEffect} from "react";
import Plan from "../../components/plan/Plan";
import Case from "../../components/case/Case";
import Cucumber from "../../components/cucumber/Cucumber";

function Overview() {
    const [action, setAction] = useState('');

    useEffect(() => {
        const actionValue = localStorage.getItem('action');
        setAction(actionValue);
    }, []);

    return (
        <main>
            {action === 'testStrategy' && <Strategy />}
            {action === 'testPlan' && <Plan />}
            {action === 'testCase' && <Case />}
            {action === 'cucumberScript' && <Cucumber />}
        </main>
    );
}

export default Overview;
