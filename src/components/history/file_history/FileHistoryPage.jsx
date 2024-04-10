import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {AiOutlineLeft} from "react-icons/ai";
import WarningInfo from "../../WarningInfo";
import Logo from "../../logo/Logo";

function FileHistoryPage({ switchToImage }) {
    const [fileList, setFileList] = useState([]);
    const [transcriptionFiles, setTranscriptionFiles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const tokenObject = localStorage.getItem('token');
        if (!tokenObject) return;
        const { value } = JSON.parse(tokenObject);
        async function fetchWarningData() {
            const response = await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/user/storage', {
                headers: {
                    Authorization: `Bearer ${value}`
                }
            });

            const data = await response.json();
            console.log(data);
            setFileList(data);
        }

        fetchWarningData();
        fetchTranscriptionFileData();
    }, []);

    async function fetchTranscriptionFileData() {
        const externalCustomerId = localStorage.getItem('externalCustomerId');
        const tokenObject = getToken();

        const response = await fetch(`https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/user/${externalCustomerId}/transcription`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${tokenObject}`,
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        console.log(data);
        setTranscriptionFiles(data.transcriptionFileList);
    }

    function getToken() {
        const tokenObject = localStorage.getItem('token');
        const { value } = JSON.parse(tokenObject);
        return value;
    }

    const handleRedirect = () => {
        navigate("/overview");
    };

    const handleDownload = (fileName) => {
        const tokenObject = localStorage.getItem('token');
        if (!tokenObject) return;
        const { value } = JSON.parse(tokenObject);
        if (fileName) {
            fetch(`https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/user/${encodeURIComponent(fileName)}/file`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${value}`,
                },
            })
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(new Blob([blob]));
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                })
                .catch(error => console.error('Ошибка:', error));
        }
    };

    const handleDownloadTranscription = (fileName) => {

        const tokenObject = localStorage.getItem('token');

        if (!tokenObject) return;
        const { value } = JSON.parse(tokenObject);

        const externalCustomerId = localStorage.getItem('externalCustomerId');

        if (fileName) {
            const params = new URLSearchParams({
                fileType: "AUDIO_TRANSCRIPTION"
            }).toString();

            fetch(`https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/user/${externalCustomerId}/file/${encodeURIComponent(fileName)}?${params}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${value}`,
                }
            })
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(new Blob([blob]));
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                })
                .catch(error => console.error('Ошибка:', error));
        }
    };

    return (
        <main>
            <div className="container">
                <div className="d-flex align-items-center">
                    <Logo/>
                </div>
                <div className="go-back-link" onClick={() => navigate(-1)}>
                    <p className="mb-0">
                        <AiOutlineLeft className={'icon-ba'}/>
                        Back
                    </p>
                </div>
                <div className="text-center">
                    <h4>File History</h4>
                    <button className="btn btn-primary mb-5 mt-2 custom-button" onClick={switchToImage}>Go to Image
                        History
                    </button>
                </div>
                <div className="table-responsive">
                    <table className="table table-sm">
                        <thead>
                        <tr>
                            <th>Datetime</th>
                            <th>Input</th>
                            <th>Warning</th>
                            <th>Output</th>
                        </tr>
                        </thead>
                        <tbody>
                        {fileList.map((warning, index) => (
                            <tr key={index}>
                                <th>{warning.createdAt}</th>
                                <th onClick={() => handleDownload(warning.inputFileName)}>
                                    {warning.inputFileName}
                                </th>
                                <th>
                                    {warning.inadmissibleInformationList.length >= 1 && (
                                        <WarningInfo inadmissibleInformationList={warning.inadmissibleInformationList}/>
                                    )}
                                </th>
                                <th onClick={() => handleDownload(warning.outputFileName)}>
                                    {warning.outputFileName}
                                </th>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="text-center mt-5">
                    <h4>Transcription File</h4>
                </div>
                <div className="table-responsive" style={{display: 'flex', justifyContent: 'center'}}>
                    <table className="table table-sm" style={{tableLayout: 'auto', width: 'auto'}}>
                        <thead>
                        <tr>
                            <th>Datetime</th>
                            <th style={{textAlign: 'center'}}>Audio Transcription file name</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {transcriptionFiles.map((file, index) => (
                            <tr key={index}>
                                <th>{file.createdAt}</th>
                                <th onClick={() => handleDownloadTranscription(file.fileName)}
                                    style={{textAlign: 'center'}}>
                                    {file.fileName}
                                </th>
                                <th>{file.status}</th>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </main>
    );
}

export default FileHistoryPage;
