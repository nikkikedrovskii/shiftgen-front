import React, {useContext, useEffect, useRef, useState} from 'react';
import qinshiftLogo from '../../img/qinshift_logo.svg';
import {Link, useNavigate} from 'react-router-dom';
import {TimerContext} from "../timer/TimerProvider";

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

    useEffect(() => {
        async function makeRequest(language, testStrategy) {
            const timeout = setTimeout(() => {
                navigate("/error")
                throw new Error('Timeout Error');
            }, 130000);
            const responsePromise = await fetch('http://shiftgen-env.eba-cigf3qkz.eu-north-1.elasticbeanstalk.com/script/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    language: language,
                    testCaseList: testStrategy
                }),
            });

            const response = await responsePromise;
            clearTimeout(timeout);

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
        }

        async function executeRequests() {
            for (let i = 0; i < languages.length; i++) {
                const language = languages[i];
                const storedData = localStorage.getItem('responseData');
                const testStrategy = JSON.parse(storedData);

                const responseData = await makeRequest(language, testStrategy);
                console.log(`Результат для ${language} с стратегией ${testStrategy}:`, responseData);
            }
        }

        const handleStorageChange = async (e) => {
            const storedData = localStorage.getItem('responseData');
            if (storedData) {
                hideBlock();
                setResponseData(JSON.parse(storedData));
                const testStrategy = JSON.parse(storedData);
                console.log(" into handler " + testStrategy)
                executeRequests()
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

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('useCase');
        localStorage.removeItem('responseData');
        window.location.href = '/';
    };

    return (
        <main>
            <div className="container">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" height="50px" width="50px" viewBox="0 0 50 50">
                                <circle cx="25" cy="25" fill="none" r="24" stroke="#ffffff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" />
                                <rect fill="none" height="50" width="50" />
                                <path fill="#ffffff" d="M29.933,35.528c-0.146-1.612-0.09-2.737-0.09-4.21c0.73-0.383,2.038-2.825,2.259-4.888c0.574-0.047,1.479-0.607,1.744-2.818  c0.143-1.187-0.425-1.855-0.771-2.065c0.934-2.809,2.874-11.499-3.588-12.397c-0.665-1.168-2.368-1.759-4.581-1.759  c-8.854,0.163-9.922,6.686-7.981,14.156c-0.345,0.21-0.913,0.878-0.771,2.065c0.266,2.211,1.17,2.771,1.744,2.818  c0.22,2.062,1.58,4.505,2.312,4.888c0,1.473,0.055,2.598-0.091,4.21c-1.261,3.39-7.737,3.655-11.473,6.924  c3.906,3.933,10.236,6.746,16.916,6.746s14.532-5.274,15.839-6.713C37.688,39.186,31.197,38.93,29.933,35.528z" />
                            </svg>
                        </button>
                        <ul className="dropdown-menu">
                            <Link to="/history" className="dropdown-item">History</Link>
                            <button className="dropdown-item" onClick={handleLogout}>Log out</button>
                            <a className="dropdown-item" href="#">Delete account</a>
                        </ul>
                    </div>
                    <img src={qinshiftLogo} alt="logo Qinshift" className="brand-logo" />
                </div>
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
                            <h4 id="cypress" style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}>Cypress</h4>
                            <p dangerouslySetInnerHTML={{ __html: cypressData }} />
                            <h4 id="python" style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}>Python</h4>
                            <p dangerouslySetInnerHTML={{ __html: pythonData }} />
                            <h4 id="playwright" style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}>Playwright</h4>
                            <p dangerouslySetInnerHTML={{ __html: playwrightData }} />
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
