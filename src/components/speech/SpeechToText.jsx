import React, {useState} from 'react';
import './Spinner.css'
import {useNavigate} from "react-router-dom";
import Logo from "../logo/Logo";
import styles from "../speech/SpeechToText.module.css";

function SpeechToText({ setShowComponent }) {

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

            setIsFileLoaded(true);


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
            <div>
                <div className="header-row mb-5" onClick={() => setShowComponent('generationPage')}
                     style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                    <Logo/>
                </div>
                <div className={styles.navigationButtons}>
                    <button className="btn btn-primary custom-button" onClick={() => setShowComponent('dalleChatPage')}>DRAW</button>
                    <button className="btn btn-primary custom-button" onClick={() => setShowComponent('chatPage')}>QinGPT</button>
                    <button className="btn btn-primary custom-button" onClick={() => setShowComponent('assistantChatPage')}>DATA</button>
                    <button className="btn btn-primary custom-button" onClick={() => setShowComponent('generationPage')}>TaaS</button>
                </div>
                <div className="upload-container"
                     style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div>
                        <div>Add a file(Only mono audio). Please use a unique name.</div>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <input type="file" accept=".mp3" onChange={handleFileChange}/>
                    </div>
                    {isFileLoaded && (
                        <div>Conversion has been initiated. You can download the file in history when the conversion is
                            successful.</div>
                    )}
                    <button className="btn btn-primary mt-3" onClick={handleConvert} style={{marginTop: '16px'}}
                            disabled={excelFileUpload}>Convert
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
