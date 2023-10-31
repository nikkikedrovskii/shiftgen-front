import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import qinshiftLogo from '../../img/qinshift_logo.svg';


function Home() {
    const [inputValue, setInputValue] = useState('');
    let navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [inputDataDisabled, setInputDataDisabled] = useState(false);
    const [fileUploaded, setFileUploaded] = useState(false);



    useEffect(() => {
        localStorage.removeItem("responseData");
        localStorage.removeItem("action");
        localStorage.removeItem("data");
        localStorage.removeItem("uploadedFile");
    }, []);

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
        }
        localStorage.setItem('data', inputValue);
        navigate("/authorization")
    }
    const helpButton = () => {
        navigate("/help")
    }

    const handleUpload = () => {
        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const base64String = event.target.result.split(',')[1]; // Получаем base64 строку

                const fileData = {
                    filename: file.name, // Сохраняем имя файла
                    base64String: base64String
                };

                localStorage.setItem('uploadedFile', JSON.stringify(fileData)); // Сохраняем в localStorage
            };

            reader.readAsDataURL(file);
            setInputDataDisabled(true);
            setFileUploaded(true);
        }
    };

    return (
        <main>
            <div className="container">
                <img src={qinshiftLogo} alt="logo Qinshift" className="brand-logo" />
                <div className="row justify-content-end mb-2">
                    <div className="col-auto">
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <div className="col-auto">
                        <button onClick={handleUpload} disabled={!file} className="btn btn-primary">Upload</button>
                    </div>
                </div>
                <form>
                    <div className="form-group pt-4">
                        <div className="paste-icon" data-target="#inputdata" onClick={handlePasteClick}/>
                        <label htmlFor="inputdata">Insert analysis or upload file:</label>
                        <textarea
                            className="form-control"
                            id="inputdata"
                            value={inputValue}
                            onChange={handleInputChange}
                            disabled={inputDataDisabled}
                        />
                    </div>
                    {fileUploaded && <div className="text-center">The file has been uploaded. The text input field is locked</div>}
                    <div className="text-center pt-4 pt-lg-5">
                        <button type="button" className="btn btn-primary custom-button" onClick={handleSubmit}>Generate Test Strategy</button>
                        <button type="button" className="btn btn-primary mx-2 custom-button" onClick={handleSubmit}>Generate Test Plan</button>
                        <button type="button" className="btn btn-primary custom-button" onClick={handleSubmit}>Generate Test Cases</button>
                        <button type="button" className="btn btn-primary mx-2 custom-button" onClick={helpButton}>Help</button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Home;

