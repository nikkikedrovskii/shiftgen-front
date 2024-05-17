import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {AiOutlineLeft} from "react-icons/ai";

function Billing() {

    const [amount, setAmount] = useState([]);
    const navigate = useNavigate();
    const [transcriptionFiles, setTranscriptionFiles] = useState([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    useEffect(() => {
        const tokenObject = localStorage.getItem('token');
        const {value} = JSON.parse(tokenObject);
        async function fetchWarningData() {
            const response = await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/billing', {
                headers: {
                    Authorization: `Bearer ${value}`
                }
            })

            const data = await response.json();

            console.log(data)
            setAmount(data);

        }
        fetchWarningData();

        const activeUser = localStorage.getItem('activeUser');
        const {authRole} = JSON.parse(activeUser);
        if (authRole  === "ADMIN") {
            setIsButtonDisabled(true)
            fetchBillingHistoryData();
        }

    }, []);

    function getToken() {
        const tokenObject = localStorage.getItem('token');
        const { value } = JSON.parse(tokenObject);
        return value;
    }

    async function fetchBillingHistoryData() {
        const tokenObject = getToken();

        const response = await fetch(`https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/billing/history`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${tokenObject}`,
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        console.log(data);
        setTranscriptionFiles(data.billingList);
    }

    const handleDownloadTranscription = (fileName) => {

        const tokenObject = localStorage.getItem('token');

        if (!tokenObject) return;
        const { value } = JSON.parse(tokenObject);

        if (fileName) {

            fetch(`https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/billing/${encodeURIComponent(fileName)}`, {
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
                <div className="text-center">
                    <div className="go-back-link" onClick={() => navigate(-1)}>
                        <p className="mb-0">
                            <AiOutlineLeft className={'icon-ba'}/>
                            Back
                        </p>
                    </div>
                    <h1>Billing</h1>
                    <p>
                        Amount for the current month:
                        <span style={{
                            verticalAlign: 'middle',
                            width: '30px',
                            marginLeft: '100px',
                            marginRight: '10px'
                        }}>{amount.amount} $</span>
                    </p>
                </div>
                {isButtonDisabled &&<div className="text-center mt-5">
                    <h4>Billing history</h4>
                <div className="table-responsive" style={{display: 'flex', justifyContent: 'center'}}>
                    <table className="table table-sm" style={{tableLayout: 'auto', width: 'auto'}}>
                        <thead>
                        <tr>
                            <th>Datetime</th>
                            <th style={{textAlign: 'center'}}>File name</th>
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
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                </div>}
            </div>
        </main>

    );
}

export default Billing;
