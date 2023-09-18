import React, {useEffect, useRef, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import qinshiftLogo from '../../img/qinshift_logo.svg';

function YourComponent() {
    const outputRef = useRef(null);
    const [responseData, setResponseData] = useState([]);
    const [cypressResult, setCypressResult] = useState(null);
    const [pythonResult, setPythonResult] = useState(null);
    const [playwrightResult, setPlaywrightResult] = useState(null);
    const languages = ["cypress", "python", "playwright"];

/*    useEffect(() => {
        const handleStorageChange = (e) => {
            const storedData = localStorage.getItem('responseData');
            if (storedData) {
                setResponseData(JSON.parse(storedData));
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);*/

    useEffect(() => {
        async function makeRequest(language, testStrategy) {

            const response = await fetch('http://localhost:5000/script/generate', {
                method: 'POST', // Метод запроса может быть другим
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    language: language,
                    testStrategyList: testStrategy
                }),
            });

            const data = await response.json();

            if (language === "cypress") {
                // setCypressResult(data.script)
                let formattedString = data.script.replace(/\n/g, '<br>');
                document.getElementById('cypressResult').innerHTML = formattedString;
            } else if (language === "python") {
                setPythonResult(data.script)
            } else if (language === "playwright") {
                setPlaywrightResult(data.script)
            }
            return data;
        }

        async function executeRequests() {
            for (let i = 0; i < languages.length; i++) {
                const language = languages[i];
                const storedData = localStorage.getItem('responseData');
                const testStrategy = JSON.parse(storedData);

                const responseData = await makeRequest(language, testStrategy);

                // Здесь вы можете обрабатывать ответ от сервера
                console.log(`Результат для ${language} с стратегией ${testStrategy}:`, responseData);
            }
        }

        const handleStorageChange = async (e) => {
            const storedData = localStorage.getItem('responseData');
            if (storedData) {
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

    const scrollToTarget = (target) => {
        console.log(JSON.parse(localStorage.getItem("responseData"))[1].name+ " ttrararar ")

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
            const text = outputRef.current.innerText;
            await navigator.clipboard.writeText(text);
            console.log('Content copied to clipboard');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
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
                            <a className="dropdown-item" href="historie.html">History</a>
                            <a className="dropdown-item" href="#">Log out</a>
                            <a className="dropdown-item" href="#">Delete account</a>
                        </ul>
                    </div>
                    <img src={qinshiftLogo} alt="logo Qinshift" className="brand-logo" />
                </div>
                <form id="inputarea">
                    <div className="form-group pt-4">
                        <div className="copy-icon" onClick={copyContent}></div>
                        <label htmlFor="outputdata">Your test cases:</label>
                        <div className="read-rights pt-3 ps-3 pe-3 pb-3" id="outputdata">
                            {responseData.map((item, index) => (
                                <li key={index}>
                                    <h4>{index+1})</h4>
                                    <h4>Name:</h4> {item.name}
                                    <h4> Priority:</h4> {item.priority}
                                    <h4> Conditions:</h4> {item.conditions}
                                    <h4> Stages of Execution:</h4> {item.stagesOfExecution}
                                    <h4> Result:</h4> {item.result}
                                </li>
                            ))}
                            <h4 id="cypress">Cypress</h4>
                            <p id="cypressResult"></p>
                            <h4 id="python">Python</h4>
                            <p>{pythonResult}</p>
                            <h4 id="playwright">Playwright</h4>
                            <p>{playwrightResult}</p>
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

export default YourComponent;
