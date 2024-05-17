import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import qinshiftLogo from "../../img/qinshift_logo.svg";
import AuthorizedUserDropdown from "../dropdown/AuthorizedUserDropdown";
import UnauthorizedUserDropdown from "../dropdown/UnauthorizedUserDropdown";
import styles from './GenerationPage.module.css';

function GenerationPage({ setShowComponent }) {

    const [inputValue, setInputValue] = useState('');
    let navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [inputDataDisabled, setInputDataDisabled] = useState(false);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [excelFileUpload, setExcelFileUpload] = useState(true);
    const [isUserAuthorized, setUserAuthorized] = useState(false);
    const [isTextGenerationLimitExceeded, setIsTextGenerationLimitExceeded] = useState(false);

    useEffect(() => {
        localStorage.removeItem("responseData");
        localStorage.removeItem("action");
        localStorage.removeItem("data");
        localStorage.removeItem("uploadedFile");
        isAuthenticated();

       const isTextGenerationLimitExceeded = localStorage.getItem('isTextGenerationLimitExceeded');
        console.log(isTextGenerationLimitExceeded)
        if (isTextGenerationLimitExceeded) {
            setIsTextGenerationLimitExceeded(JSON.parse(isTextGenerationLimitExceeded))
        }
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
        if (selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            setExcelFileUpload(false);
        }
        console.log(" type of file " + selectedFile.type)
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
        } else if (buttonText === 'Generate script using excel format') {
            localStorage.removeItem("action")
            localStorage.setItem('action', "scriptFromExcel");
        }
        localStorage.setItem('data', inputValue);
        const tokenObject = localStorage.getItem('token');
        const externalCustomerId = localStorage.getItem('externalCustomerId');

        if (tokenObject){
            const {value} = JSON.parse(tokenObject);
            window.location.href = 'https://master.d44820iy5gmpk.amplifyapp.com/oauth2/redirect?token=' + value + '&externalCustomerId=' + externalCustomerId;
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
            <div>
                <div className={styles.header}>
                    <div>
                        <img src={qinshiftLogo} alt="logo Qinshift" className={styles.logo}/>
                    </div>
                    <div className={styles.rightControls}>
                        <div className={styles.controls}>
                            <input type="file" onChange={handleFileChange} className={styles.inputFile}/>
                            <button onClick={handleUpload} disabled={!file} className={styles.button} className="btn btn-primary">Upload</button>
                        </div>
                    </div>
                    <div>
                        {isUserAuthorized ? <AuthorizedUserDropdown/> : <UnauthorizedUserDropdown/>}
                    </div>
                </div>
                <div className={styles.navigationButtons}>
                    <button className="btn btn-primary custom-button"
                            onClick={() => setShowComponent('dalleChatPage')}>DRAW
                    </button>
                    <button className="btn btn-primary custom-button"
                            onClick={() => setShowComponent('chatPage')}>QinGPT
                    </button>
                    <button className="btn btn-primary custom-button"
                            onClick={() => setShowComponent('assistantChatPage')}>DATA
                    </button>
                    <button className="btn btn-primary custom-button"
                            onClick={() => setShowComponent('speechPage')}>SPEECH
                    </button>
                </div>
                <div>
                    <form>
                        <div className="form-group">
              <textarea
                  className="form-control"
                  id="inputdata"
                  value={inputValue}
                  onChange={handleInputChange}
                  disabled={inputDataDisabled}
              />
                        </div>
                        {fileUploaded &&
                            <div className="text-center">The file has been uploaded. The text input field is
                                locked</div>}
                    </form>
                </div>
                {isTextGenerationLimitExceeded && (
                    <div style={{ color: 'white', marginTop: '10px' }}>
                        The text generation limit has been reached. Please contact the administrator.
                    </div>
                )}
                <div>
                    <div className={styles.navigationButtons}>
                        <button className="btn btn-primary custom-button" onClick={handleSubmit} disabled={isTextGenerationLimitExceeded}>Generate Test
                            Strategy
                        </button>
                        <button className="btn btn-primary custom-button" onClick={handleSubmit} disabled={isTextGenerationLimitExceeded}>Generate Test Plan
                        </button>
                        <button className="btn btn-primary custom-button" onClick={handleSubmit} disabled={isTextGenerationLimitExceeded}>Generate Test Cases
                        </button>
                        <button className="btn btn-primary custom-button" onClick={handleSubmit} disabled={isTextGenerationLimitExceeded}>Generate cucumber
                            script
                        </button>
                        <button className="btn btn-primary custom-button" onClick={handleSubmit}
                                disabled={excelFileUpload}>Generate script using
                            excel format
                        </button>
                    </div>
                </div>
                <button className="btn btn-primary custom-button" onClick={helpButton}
                        className={styles.helpButton}>Help
                </button>
            </div>
        </main>
    );
}

export default GenerationPage;

