import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import qinshiftLogo from "../../img/qinshift_logo.svg";
import AuthorizedUserDropdown from "../dropdown/AuthorizedUserDropdown";
import UnauthorizedUserDropdown from "../dropdown/UnauthorizedUserDropdown";

function GenerationPage({ switchToChatQinGptPage, switchToQinImagePage, switchToDataAnalystPage }) {

    const [inputValue, setInputValue] = useState('');
    let navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [inputDataDisabled, setInputDataDisabled] = useState(false);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [isUserAuthorized, setUserAuthorized] = useState(false);


    useEffect(() => {
        localStorage.removeItem("responseData");
        localStorage.removeItem("action");
        localStorage.removeItem("data");
        localStorage.removeItem("uploadedFile");
        isAuthenticated();
    }, []);

    function isAuthenticated() {
        const token = localStorage.getItem('token');

        if (!token) {
            setUserAuthorized(false)
        } else {
            const {expiry} = JSON.parse(token);
            if (expiry && (new Date().getTime() < expiry)) {
                setUserAuthorized(true);
            } else {
                setUserAuthorized(false);
                localStorage.clear();
            }
        }

    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        if (e.target.value.length > 0) {
            document.querySelectorAll('button').forEach(s => s.removeAttribute("disabled"))
        }
    }

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const buttonText = e.target.innerText;

        if (buttonText === 'Generate Test Cases') {
            localStorage.removeItem("action")
            localStorage.setItem('action', "testCase");

        } else if (buttonText === 'Generate Test Strategy') {
            localStorage.removeItem("action")
            localStorage.setItem('action', "testStrategy");

        } else if (buttonText === 'Generate Test Plan') {
            localStorage.removeItem("action")
            localStorage.setItem('action', "testPlan");
        } else if (buttonText === 'Generate cucumber script') {
            localStorage.removeItem("action")
            localStorage.setItem('action', "cucumberScript");
        }
        localStorage.setItem('data', inputValue);
        const tokenObject = localStorage.getItem('token');
        if (tokenObject){
            const {value} = JSON.parse(tokenObject);
            window.location.href = 'https://master.d44820iy5gmpk.amplifyapp.com/oauth2/redirect?token=' + value;
        } else {
            navigate("/authorization")
        }
    }

    const helpButton = () => {
        navigate("/help")
    }

    const handleUpload = () => {
        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const base64String = event.target.result.split(',')[1];

                const fileData = {
                    filename: file.name,
                    base64String: base64String
                };

                localStorage.setItem('uploadedFile', JSON.stringify(fileData));
            };

            reader.readAsDataURL(file);
            setInputDataDisabled(true);
            setFileUploaded(true);
        }
    };

    return (
        <main>
            <div className="container">
                <div className="header-row"
                     style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                    <img src={qinshiftLogo} alt="logo Qinshift" className="brand-logo"/>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{marginRight: '15px'}}>
                            <input type="file" onChange={handleFileChange}/>
                        </div>
                        <button onClick={handleUpload} disabled={!file} className="btn btn-primary"
                                style={{marginRight: '15px'}}>Upload
                        </button>
                        {isUserAuthorized ? <AuthorizedUserDropdown/> : <UnauthorizedUserDropdown/>}
                    </div>
                </div>
                <div className="text-center">
                    <button className="btn btn-primary mx-5 custom-button" onClick={switchToQinImagePage}>DRAW</button>
                    <button className="btn btn-primary custom-button" onClick={switchToChatQinGptPage}>QinGPT</button>
                    <button className="btn btn-primary mx-5 custom-button" onClick={switchToDataAnalystPage}>D&A</button>
                    <form>
                        <div className="form-group" style={{display: 'flex', alignItems: 'center'}}>
                        <textarea
                            className="form-control"
                            id="inputdata"
                            value={inputValue}
                            onChange={handleInputChange}
                            disabled={inputDataDisabled}
                            style={{flex: 1}}
                        />
                        </div>
                        {fileUploaded &&
                            <div className="text-center">The file has been uploaded. The text input field is
                                locked</div>}
                        <div className="text-center pt-4 pt-lg-5">
                            <div>
                                <button type="button" className="btn btn-primary custom-button"
                                        onClick={handleSubmit}>Generate Test Strategy
                                </button>
                                <button type="button" className="btn btn-primary mx-2 custom-button"
                                        onClick={handleSubmit}>Generate Test Plan
                                </button>
                                <button type="button" className="btn btn-primary custom-button"
                                        onClick={handleSubmit}>Generate Test Cases
                                </button>
                                <button type="button" className="btn btn-primary mx-2 custom-button"
                                        style={{minWidth: '250px'}} onClick={handleSubmit}>Generate cucumber script
                                </button>
                            </div>
                            <button type="button" className="btn btn-primary mx-2 custom-button mt-2"
                                    onClick={helpButton}>Help
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default GenerationPage;
