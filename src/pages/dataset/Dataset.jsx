import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Logo from "../../components/logo/Logo";

function Dataset() {

    const [datasetList, setDatasetList] = useState([]);
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDatasetFile();
    }, []);


    async function fetchDatasetFile() {

        const response = await fetch(`https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/dataset`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        console.log(data);
        setDatasetList(data.datasetResponseList);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
           await axios.post('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/dataset', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
            console.error('Error uploading file: ', error);
            alert('Error uploading file');
        }
        fileInputRef.current.value = "";
        fetchDatasetFile();
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleDelete = async (fileName) => {
        try {
            const response = await fetch(`https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/dataset/${fileName}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setDatasetList(currentData => currentData.filter(item => item.fileName !== fileName));
        } catch (error) {
            console.error('Error during delete:', error);
        }
        fetchDatasetFile();
    };

    return (
        <main>
            <div className="container">
                <div className="header-row"
                     style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                    <Logo/>
                </div>
                <div className="upload-container mt-5"
                     style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <input type="file" onChange={handleFileChange} ref={fileInputRef}/>
                    </div>
                    <button className="btn btn-primary mt-3 mb-5" style={{marginTop: '16px'}} onClick={handleSubmit}>Save file to QinGPT dataset</button>
                </div>
                <div className="table-responsive">
                    <table className="table table-sm">
                        <thead>
                        <tr>
                            <th>Datetime</th>
                            <th style={{textAlign: 'center'}}>File</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {datasetList.map((warning, index) => (
                            <tr key={index}>
                                <th>{warning.createdAt}</th>
                                <th style={{textAlign: 'center'}}>
                                    {warning.fileName}
                                </th>
                                <th>
                                    <button
                                        className="btn btn-primary custom-button"
                                        onClick={() => handleDelete(warning.fileName)}>
                                        Delete
                                    </button>
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

export default Dataset;
