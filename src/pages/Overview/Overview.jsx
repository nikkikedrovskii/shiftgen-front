import React, {useEffect, useState} from 'react';
import Strategy from "../../components/strategy/Strategy";
import Plan from "../../components/plan/Plan";
import Case from "../../components/case/Case";
import Cucumber from "../../components/cucumber/Cucumber";
import ScriptFromExcel from "../../components/case/ScriptFromExcel";

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
            {action === 'scriptFromExcel' && <ScriptFromExcel />}
        </main>
    );
}

export default Overview;
