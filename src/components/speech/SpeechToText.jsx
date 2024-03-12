import React, {useState} from 'react';
import txtFileLogo from "../../img/935033.svg";
import qinshiftLogo from "../../img/qinshift_logo.svg";
import './Spinner.css'
import {useNavigate} from "react-router-dom";

function SpeechToText({ switchToChatQinGptPage, switchToQinImagePage, switchToAssistantPage, switchToGenerationPage }) {

    const [selectedFile, setSelectedFile] = useState(null);
    const [downloadUrl, setDownloadUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFileLoaded, setIsFileLoaded] = useState(false);
    const [originalFileName, setOriginalFileName] = useState('');
    const [excelFileUpload, setExcelFileUpload] = useState(true);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setExcelFileUpload(false)
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
            setOriginalFileName(fileNameWithoutExtension);
        }
    };

    function getToken() {
        const tokenObject = localStorage.getItem('token');
        const { value } = JSON.parse(tokenObject);
        return value;
    }

    async function handleConvert(){
        if (!selectedFile) {
            alert('Пожалуйста, выберите файл для конвертации.');
            return;
        }
        setIsLoading(true);

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const tokenObject = getToken();

            const response =  await fetch(`https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/speech`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${tokenObject}`
                },
                body: formData
            });
            const responseData = await response.json();
            setDownloadUrl(responseData.fileName);
            setIsFileLoaded(true)
        } catch (error) {
            console.error('Ошибка при отправке файла:', error);
        }
        setIsLoading(false);
    };

    const handleDownload = async () => {
        const tokenObject = localStorage.getItem('token');

        if (!tokenObject) return;
        const { value } = JSON.parse(tokenObject);

        const externalCustomerId = localStorage.getItem('externalCustomerId');

        if (downloadUrl) {
            const params = new URLSearchParams({
                fileType: "AUDIO_TRANSCRIPTION"
            }).toString();

            fetch(`https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/user/${externalCustomerId}/file/${encodeURIComponent(downloadUrl)}?${params}`, {
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
                    a.download = downloadUrl;

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
            <div className="header-row"
                 style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                <img src={qinshiftLogo} alt="logo Qinshift" className="brand-logo"/>
            </div>
            <div className="text-center">
                <button className="btn btn-primary mx-5 custom-button" onClick={switchToQinImagePage}>DRAW</button>
                <button className="btn btn-primary custom-button" onClick={switchToChatQinGptPage}>QinGPT</button>
                <button className="btn btn-primary mx-5 custom-button" onClick={switchToAssistantPage}>DATA</button>
                <button className="btn btn-primary custom-button" onClick={switchToGenerationPage}>TaaS</button>
            </div>
            <div className="upload-container mt-5"
                 style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <input type="file" accept=".mp3" onChange={handleFileChange}/>
                    {isLoading &&
                        <div className="spinner-border" role="status"
                             style={{color: 'yellow', marginLeft: '16px'}}></div>
                    }
                    {isFileLoaded && (
                        <img src={txtFileLogo} style={{width: '50px', height: '50px'}} onClick={handleDownload}/>
                    )}
                </div>
                <button className="btn btn-primary mt-3" onClick={handleConvert} style={{marginTop: '16px'}} disabled={excelFileUpload}>Convert
                    speech
                    to text
                </button>
            </div>
        </div>
    </main>
    )
        ;
}

export default SpeechToText;
