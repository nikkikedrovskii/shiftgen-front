import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import qinshiftLogo from '../../img/qinshift_logo.svg';
import {useNavigate} from "react-router-dom";
import {AiOutlineLeft} from "react-icons/ai";
import WarningInfo from "../../components/WarningInfo";

function History() {
    const token = localStorage.getItem('token');
    const [fileList, setFileList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        async function fetchWarningData() {
            const response = await fetch('https://shiftgen-env-1.eba-cigf3qkz.eu-north-1.elasticbeanstalk.com/user/storage', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = await response.json();

            console.log(data)
            setFileList(data);

        }

        fetchWarningData();
    }, []);


    const handleRedirect = () => {
        const action = localStorage.getItem("action");
        if (action === "testCase") {
            navigate("/case")
        } else if (action === "testStrategy") {
            navigate("/strategy")
        } else if (action === "testPlan") {
            navigate("/plan")
        }
    };

    const handleDownload = (fileName) => {
        if (fileName) {
            const token = localStorage.getItem("token");

            fetch(`https://shiftgen-env-1.eba-cigf3qkz.eu-north-1.elasticbeanstalk.com/user/${encodeURIComponent(fileName)}/file`, {
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
                    <div className="go-back-link" onClick={handleRedirect}>
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
