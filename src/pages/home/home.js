import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import qinshiftLogo from '../../img/qinshift_logo.svg';
import Authorization from "../google/authorization";


function Home() {
    const [inputValue, setInputValue] = useState('');
    let navigate = useNavigate();

    const handlePasteClick = async () => {
        const text = await navigator.clipboard.readText();
        setInputValue(text);
        if (text.length > 0) {
            document.querySelectorAll('button').forEach(s => s.removeAttribute("disabled"))
        }
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        if (e.target.value.length > 0) {
            document.querySelectorAll('button').forEach(s => s.removeAttribute("disabled"))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const buttonText = e.target.innerText;

        if (buttonText === 'Generate Test Cases') {

            localStorage.removeItem("action")
            localStorage.setItem('action', "testCase");

        } else if (buttonText === 'Generate Test Strategies') {

            localStorage.removeItem("action")
            localStorage.setItem('action', "testStrategy");

        } else if (buttonText === 'Generate Test Plan') {

            localStorage.removeItem("action")
            localStorage.setItem('action', "testPlan");
        }
        localStorage.setItem('data', inputValue);
        navigate("/authorization")
    }

    return (
        <main>
            <div className="container">
                <img src={qinshiftLogo} alt="logo Qinshift" className="brand-logo" />
                <form>
                    <div className="form-group pt-4">
                        <div className="paste-icon" data-target="#inputdata" onClick={handlePasteClick}></div>
                        <label htmlFor="inputdata">Insert use cases from analysis:</label>
                        <textarea
                            className="form-control"
                            id="inputdata"
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="text-center pt-4 pt-lg-5">
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Generate Test Cases</button>
                        <button type="button" className="btn btn-primary mx-2" onClick={handleSubmit}>Generate Test Strategies</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Generate Test Plan</button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Home;
