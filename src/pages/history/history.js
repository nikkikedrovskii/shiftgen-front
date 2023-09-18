import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import qinshiftLogo from '../../img/qinshift_logo.svg';

function History() {
    const token = localStorage.getItem('token');
    const [fileList, setFileList] = useState([]);
    useEffect(() => {
        // Функция для получения данных с сервера
        async function fetchWarningData() {
            try {
                const response = await fetch('http://shiftgen-app-env.eba-ymv6peay.eu-north-1.elasticbeanstalk.com/user/storage',{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setFileList(data);
            } catch (error) {
                console.error('Error fetching warning data:', error);
            }
        }

        fetchWarningData();
    }, []);


    const handleAgreementChange = () => {
        document.querySelectorAll('button').forEach(btn => {
            btn.classList.toggle('d-none');
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = '/ShiftGen/google.html';
    }

    const [fileName, setFileName] = useState('');

    const handleDownload = (fileName) => {
        if (fileName) {
            const token = localStorage.getItem("token");

            fetch(`http://shiftgen-app-env.eba-ymv6peay.eu-north-1.elasticbeanstalk.com/user/${encodeURIComponent(fileName)}/file`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
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
    }

    return (
        <main>
            <div className="container">
                <div className="d-flex align-items-center">
                    <div className="go-back-link">
                        <p className="mb-0"><a href="prehled.html">Back</a></p>
                    </div>
                    <img src={qinshiftLogo} alt="logo Qinshift" className="ms-auto brand-logo"/>
                </div>
                <h4 className="text-center">History</h4>
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
                                <tr>
                                    <th>{warning.createdAt}</th>
                                    <th onClick={() => handleDownload(warning.inputFileName)}>
                                        {warning.inputFileName}
                                    </th>
                                    <th></th>
                                        <th onClick={() => handleDownload(warning.outputFileName)}>
                                        {warning.outputFileName}
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}

export default History;
