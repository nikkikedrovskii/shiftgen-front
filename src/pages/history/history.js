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
                                <tr key={index}>
                                    <th>{warning.createdAt}</th>
                                    <th><a href={`http://shiftgen-app-env.eba-ymv6peay.eu-north-1.elasticbeanstalk.com/user/${warning.inputFileName}/file`}>{warning.inputFileName}</a></th>
                                    <th></th>
                                    <th><a href={`http://shiftgen-app-env.eba-ymv6peay.eu-north-1.elasticbeanstalk.com/user/${warning.outputFileName}/file`}>{warning.outputFileName}</a></th>
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
