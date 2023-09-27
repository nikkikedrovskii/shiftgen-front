import React, {useEffect, useRef, useState} from 'react';
import qinshiftLogo from '../../img/qinshift_logo.svg';
import {Link} from 'react-router-dom';

function Plan() {
    const [responseData, setResponseData] = useState([]);
    const [responseStorage, setResponseStorage] = useState("");
    const languages = ["cypress", "python", "playwright"];
    const [planData, setPlanData] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {

        const storedData = JSON.parse(localStorage.getItem('responseData'));
        if (storedData) {
            let formattedString = storedData.replace(/\n/g, '<br>');
            setPlanData(formattedString);
        }

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleStorageChange = async (e) => {
        const storedData = JSON.parse(localStorage.getItem('responseData'));
        if (storedData) {
            let formattedString = storedData.replace(/\n/g, '<br>');
            setPlanData(formattedString);
            setResponseStorage(storedData);
        }
    }
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
                        <div className="copy-icon" onClick={copyContent}/>
                        <label htmlFor="outputdata">Your test plan:</label>
                        <div className="read-rights pt-3 ps-3 pe-3 pb-3" id="outputdata" >
                            <p dangerouslySetInnerHTML={{ __html: planData }} />
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Plan;
