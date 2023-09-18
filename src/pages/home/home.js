import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import qinshiftLogo from '../../img/qinshift_logo.svg';


function Home() {
    const [inputValue, setInputValue] = useState('');
    let navigate = useNavigate();

    const handlePasteClick = async () => {
        const text = await navigator.clipboard.readText();
        setInputValue(text);
        if (text.length > 0) {
            document.querySelector('button').removeAttribute('disabled');
        }
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        if (e.target.value.length > 0) {
            document.querySelector('button').removeAttribute('disabled');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: замените на вызов вашего эндпоинта
        localStorage.setItem('useCase', inputValue);
        navigate("/authorization")
    }

    return (
        <main>
            <div className="container">
                <img src={qinshiftLogo} alt="logo Qinshift" className="brand-logo" />
                <form onSubmit={handleSubmit}>
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
                        <button type="submit" className="btn btn-primary" disabled>Generate test Cases</button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Home;
