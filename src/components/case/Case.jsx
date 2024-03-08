import React, {useContext, useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {TimerContext} from "../../pages/timer/TimerProvider.js";
import PageHeader from "../page_header/PageHeader";

function Case() {
    const [loading, setLoading] = useState(false);
    const outputRef = useRef(null);
    const [responseData, setResponseData] = useState([]);
    const languages = ["cypress", "python", "playwright"];
    const [cypressData, setCypressData] = useState('');
    const [scriptData, setScriptData] = useState('');
    const [pythonData, setPythonData] = useState('');
    const [playwrightData, setPlaywrightData] = useState('');
    const navigate = useNavigate();
    const seconds = useContext(TimerContext);
    const [isVisible, setIsVisible] = useState(true);
    const tokenObject = localStorage.getItem('token');
    const {value} = JSON.parse(tokenObject);

    useEffect(() => {

        const storedData = JSON.parse(localStorage.getItem('responseData'));
        if (storedData) {
            setResponseData(storedData)
        }
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleStorageChange = async (e) => {
        const storedData = localStorage.getItem('responseData');
        if (storedData) {
            hideBlock();
            setResponseData(JSON.parse(storedData));
            const testStrategy = JSON.parse(storedData);
            console.log(" into handler " + testStrategy)
        }
    }

    const hideBlock = () => {
        setIsVisible(false);
    };
    const scrollToTarget = (target) => {

        if (outputRef.current) {
            const targetElement = outputRef.current.querySelector(target);
            if (targetElement) {
                const offset = targetElement.offsetTop - 100;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        }
    };

    const copyContent = async () => {
        try {
            const outputdata = document.getElementById('outputdata');
            await navigator.clipboard.writeText(outputdata.innerText);
            console.log('Content copied to clipboard');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };
    const fetchData = async (e) => {
        e.preventDefault();

        const buttonText = e.target.innerText;
        const storedData = localStorage.getItem('responseData');
        const testStrategy = JSON.parse(storedData);
        setLoading(true);
        const responsePromise = await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/script/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${value}`,
            },
            body: JSON.stringify({
                language: buttonText,
                testCaseList: testStrategy
            }),
        });

        const response = await responsePromise;

        const data = await response.json();
        console.log(data.script)
        if (response.status === 200) {
            let formattedString = data.script.replace(/\n/g, '<br>');
            setScriptData(formattedString);
        } else {
            localStorage.setItem('error', JSON.stringify(data));
            navigate("/error")
        }
        setLoading(false);
    };

    return (
        <main>
            <div className="container">
                <PageHeader />
                <form id="inputarea">
                    <div className="form-group pt-4">
                        <div className="copy-icon" onClick={copyContent}></div>
                        <label htmlFor="outputdata" style={{ display: 'flex', alignItems: 'center' }}>
                            Your test cases:
                            {loading && <div className="spinner-border" role="status"
                                             style={{
                                                 color: 'yellow',
                                                 position: 'absolute',
                                                 right: '85%'
                                             }}>
                            </div>}
                            {isVisible && <div style={{ marginLeft: '1000px' }}>In progress: {seconds}</div>}
                        </label>
                        <div className="read-rights pt-3 ps-3 pe-3 pb-3" id="outputdata">
                            {responseData.map((item, index) => (
                                <li key={index}>
                                    <p>{index+1})</p>
                                    <p>Name: {item.name}</p>
                                    <p>Priority: {item.priority}</p>
                                    <p>Conditions: {item.conditions}</p>
                                    <p>Stages of Execution: {item.stagesOfExecution}</p>
                                    <p>Result: {item.result}</p>
                                </li>
                            ))}
                            <h4 id="cypress" style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}>Script:</h4>
                            <p dangerouslySetInnerHTML={{ __html: scriptData }} />
                        </div>
                    </div>
                    <div className="row pt-4 pt-lg-5">
                        <div className="col-4">
                        <button
                            id="cypress"
                            className="btn btn-primary"
                            style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}
                            onClick={fetchData}
                            disabled={!responseData}
                        >
                            Generate cypress
                        </button>
                        </div>
                        <div className="col-4">
                        <button
                            id="python"
                            className="btn btn-primary"
                            style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}
                            onClick={fetchData}
                            disabled={!responseData}
                        >
                            Generate python
                        </button>
                        </div>
                        <div className="col-4">
                        <button
                            id="playwright"
                            className="btn btn-primary"
                            style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}
                            onClick={fetchData}
                            disabled={!responseData}
                        >
                            Generate playwright
                        </button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Case;
