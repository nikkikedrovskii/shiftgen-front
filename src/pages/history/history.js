import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import qinshiftLogo from '../../img/qinshift_logo.svg';
import {useHistory, useNavigate} from "react-router-dom";
import {AiOutlineLeft} from "react-icons/ai";
import WarningInfo from "../../components/WarningInfo";

function History() {
    const token = localStorage.getItem('token');
    const [fileList, setFileList] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const tokenObject = localStorage.getItem('token');
        const {value} = JSON.parse(tokenObject);
        async function fetchWarningData() {
            const response = await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/user/storage', {
                headers: {
                    Authorization: `Bearer ${value}`
                }
            })

            const data = await response.json();

            console.log(data)
            setFileList(data);

        }

        fetchWarningData();
    }, []);


    function goBack() {
        navigate.goBack();
    }

    const handleRedirect = () => {
        navigate("/overview")
    };

    const handleDownload = (fileName) => {
        const tokenObject = localStorage.getItem('token');
        const {value} = JSON.parse(tokenObject);
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
    }

    return (
        <main>
            <div className="container">
                <div className="d-flex align-items-center">
                    <div className="go-back-link" onClick={() => navigate(-1)}>
                        <p className="mb-0">
                            <AiOutlineLeft className={'icon-ba'}/>
                            Back
                        </p>
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
                        {fileList.map((warning) => (
                            <tr>
                                <th>{warning.createdAt}</th>
                                <th onClick={() => handleDownload(warning.inputFileName)}>
                                    {warning.inputFileName}
                                </th>
                                <th>
                                    {warning.inadmissibleInformationList.length >=1 && (
                                        <WarningInfo inadmissibleInformationList={warning.inadmissibleInformationList} />
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
            </div>
        </main>
    );
}

export default History;
