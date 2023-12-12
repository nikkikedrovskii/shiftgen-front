import React, {useContext, useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {TimerContext} from "../../pages/timer/TimerProvider.js";
import PageHeader from "../page_header/PageHeader";

function Case() {
    const outputRef = useRef(null);
    const [responseData, setResponseData] = useState([]);
    const languages = ["cypress", "python", "playwright"];
    const [cypressData, setCypressData] = useState('');
    const [pythonData, setPythonData] = useState('');
    const [playwrightData, setPlaywrightData] = useState('');
    const navigate = useNavigate();
    const seconds = useContext(TimerContext);
    const [isVisible, setIsVisible] = useState(true);
    const tokenObject = localStorage.getItem('token');
    const {value} = JSON.parse(tokenObject);

    useEffect(() => {
/*        async function makeRequest(language, testStrategy) {
            /!*            const timeout = setTimeout(() => {
                            navigate("/error")
                            throw new Error('Timeout Error');
                        }, 130000);*!/
            const responsePromise = await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/script/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${value}`,
                },
                body: JSON.stringify({
                    language: language,
                    testCaseList: testStrategy
                }),
            });

            const response = await responsePromise;
            //   clearTimeout(timeout);

            const data = await response.json();

            if (response.status === 200) {
                if (language === "cypress") {
                    let formattedString = data.script.replace(/\n/g, '<br>');
                    setCypressData(formattedString);
                } else if (language === "python") {
                    let formattedString = data.script.replace(/\n/g, '<br>');
                    setPythonData(formattedString)
                } else if (language === "playwright") {
                    let formattedString = data.script.replace(/\n/g, '<br>');
                    setPlaywrightData(formattedString)
                }
            } else {
                localStorage.setItem('error', JSON.stringify(data));
                navigate("/error")
            }
            return data;
        }*/

/*        async function executeRequests() {
            for (let i = 0; i < languages.length; i++) {
                const language = languages[i];
                const storedData = localStorage.getItem('responseData');
                const testStrategy = JSON.parse(storedData);

                const responseData = await makeRequest(language, testStrategy);
                console.log(`Результат для ${language} с стратегией ${testStrategy}:`, responseData);
            }
        }*/

/*        async function makeRequest(e) {
            e.preventDefault();

            const buttonText = e.target.innerText;
            const storedData = localStorage.getItem('responseData');
            const testStrategy = JSON.parse(storedData);

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

            if (response.status === 200) {
                if (buttonText === "cypress") {
                    let formattedString = data.script.replace(/\n/g, '<br>');
                    setCypressData(formattedString);
                } else if (buttonText === "python") {
                    let formattedString = data.script.replace(/\n/g, '<br>');
                    setPythonData(formattedString)
                } else if (buttonText === "playwright") {
                    let formattedString = data.script.replace(/\n/g, '<br>');
                    setPlaywrightData(formattedString)
                }
            } else {
                localStorage.setItem('error', JSON.stringify(data));
                navigate("/error")
            }
            return data;
        }*/

        const handleStorageChange = async (e) => {
            const storedData = localStorage.getItem('responseData');
            if (storedData) {
                hideBlock();
                setResponseData(JSON.parse(storedData));
                const testStrategy = JSON.parse(storedData);
                console.log(" into handler " + testStrategy)
              //  executeRequests()
            }
        }
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

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
            if (buttonText === "Generate cypress script") {
                console.log(data.script)
                let formattedString = data.script.replace(/\n/g, '<br>');
                setCypressData(formattedString);
            } else if (buttonText === "Generate python script") {
                let formattedString = data.script.replace(/\n/g, '<br>');
                setPythonData(formattedString)
            } else if (buttonText === "Generate playwright script") {
                let formattedString = data.script.replace(/\n/g, '<br>');
                setPlaywrightData(formattedString)
            }
        } else {
            localStorage.setItem('error', JSON.stringify(data));
            navigate("/error")
        }
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
                            <button
                                id="cypress"
                                className="btn btn-primary"
                                style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}
                                onClick={fetchData}
                            >
                                Generate cypress script
                            </button>
                            <p dangerouslySetInnerHTML={{ __html: cypressData }} />
                            <button
                                id="python"
                                className="btn btn-primary"
                                style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}
                                onClick={fetchData}
                            >
                                Generate python script
                            </button>
                            <p dangerouslySetInnerHTML={{ __html: pythonData }} />
                            <button
                                id="playwright"
                                className="btn btn-primary"
                                style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}
                                onClick={fetchData}
                            >
                                Generate playwright script
                            </button>
                            <p dangerouslySetInnerHTML={{ __html: playwrightData }}/>
{/*                            <p dangerouslySetInnerHTML={{ __html: cypressData }} />
                            <button id="python" className="btn btn-primary" style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}>Python</button>
                            <p dangerouslySetInnerHTML={{ __html: pythonData }} />
                            <button id="playwright" className="btn btn-primary" style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}>Playwright</button>
                            <p dangerouslySetInnerHTML={{ __html: playwrightData }} />*/}
                        </div>
                    </div>
                    <div className="row pt-4 pt-lg-5">
                        <div className="col-4">
                            <a href="#cypress" className="btn btn-primary scroll-output" onClick={() => scrollToTarget('#cypress')}>Cypress</a>
                        </div>
                        <div className="col-4">
                            <a href="#python" className="btn btn-primary scroll-output" onClick={() => scrollToTarget('#python')}>Python</a>
                        </div>
                        <div className="col-4">
                            <a href="#playwright" className="btn btn-primary scroll-output" onClick={() => scrollToTarget('#playwright')}>Playwright</a>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Case;
