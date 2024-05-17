import React, {useEffect, useState} from 'react';
import styles from '../user_limit/UserLimit.module.css'
import {Tooltip} from 'react-tooltip'
import qinshiftLogo from "../../img/qinshift_logo.svg";
import {useNavigate} from "react-router-dom";
import Logo from "../logo/Logo";
import {AiOutlineLeft} from "react-icons/ai";

function UserLimit() {

    const [userLimitKeyList, setUserLimitKeyList] = useState([])
    const [userLimitList, setUserLimitList] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [selectedKey, setSelectedKey] = useState('');
    const [limitValue, setLimitValue] = useState('');
    const [currentExternalCustomerId, setCurrentExternalCustomerId] = useState('');
    const navigate = useNavigate();

    const updateLimitValue = (limitList, limitIndex, newValue) => (
        limitList.map((limit, idx) => idx === limitIndex ? { ...limit, limitValue: newValue } : limit)
    );

    const updateItemInList = (userLimitList, itemIndex, limitIndex, newValue) => (
        userLimitList.map((item, idx) => idx === itemIndex ? { ...item, limitList: updateLimitValue(item.limitList, limitIndex, newValue) } : item)
    );

    const handleChange = (itemIndex, limitIndex, newValue) => {
        const newData = updateItemInList(userLimitList, itemIndex, limitIndex, newValue);
        setUserLimitList(newData);
    };

    useEffect(() => {

        fetchUserLimitKeyList();
        fetchUserLimitList();
    }, [])

    const handleOpenModal = (externalCustomerId) => {
        setCurrentExternalCustomerId(externalCustomerId);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentExternalCustomerId('');
    };
    async function handleAddLimit(selectedKey,limitValue) {

        const requestBody = JSON.stringify({
            limitKey: selectedKey,
            limitValue: limitValue
        });

        try {
            const tokenObject = getToken();
            await fetch(`https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/user/${currentExternalCustomerId}/limit`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${tokenObject}`,
                    'Content-Type': 'application/json',
                },
                body: requestBody,
            });
            fetchUserLimitList();
        } catch (error) {
            console.error("Failed to post thread source:", error);
            throw error;
        }
        handleCloseModal();
    };

    async function handleUpdateLimit(externalCustomerId) {

        console.log(externalCustomerId)
        var limitListByExternalCustomerId =  userLimitList.find(userLimit => userLimit.externalCustomerId === externalCustomerId).limitList;


        try {
            const tokenObject = getToken();
            await fetch(`https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/user/${externalCustomerId}/limit`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${tokenObject}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    updateUserLimits: limitListByExternalCustomerId
                })
            });
            fetchUserLimitList();
            fetchUserLimitStatus(externalCustomerId,tokenObject)

        } catch (error) {
            console.error("Failed to post thread source:", error);
            throw error;
        }

    };

    async function fetchUserLimitStatus(externalCustomerId, token) {
        const response = await fetch(`https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/user/${externalCustomerId}/limit/status`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        console.log(data)
        localStorage.setItem('isTextGenerationLimitExceeded', data.textGenerationLimitExceeded);
        localStorage.setItem('isImageGenerationLimitExceeded', data.imageGenerationLimitExceeded);
        localStorage.setItem('isSpeechToTextLimitExceeded', data.speechToTextLimitExceeded);
    }

    function getToken() {
        const tokenObject = localStorage.getItem('token');
        const {value} = JSON.parse(tokenObject);
        return value;
    }


    async function fetchUserLimitKeyList() {
        const tokenObject = localStorage.getItem('token');
        const {value} = JSON.parse(tokenObject);
        const response = await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/limit/key', {
            headers: {
                Authorization: `Bearer ${value}`
            }
        });
        const data = await response.json();

        setUserLimitKeyList(data.userLimitKeyList);
    }

    async function fetchUserLimitList() {
        const tokenObject = localStorage.getItem('token');
        const {value} = JSON.parse(tokenObject);
        const response = await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/user/limit', {
            headers: {
                Authorization: `Bearer ${value}`
            }
        });
        const data = await response.json();
        setUserLimitList(data.userLimitList);
    }

    const handleDownloadExcelFile = () => {

        const tokenObject = localStorage.getItem('token');

        if (!tokenObject) return;
        const { value } = JSON.parse(tokenObject);
            fetch(`https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/billing/export`, {
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
                    a.download = "users_billing.xlsx";
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                })
                .catch(error => console.error('Ошибка:', error));

    };

    return (
        <main>
            <div>
                <div className="text-center">
                    <div className="go-back-link" onClick={() => navigate(-1)}>
                        <p className="mb-0">
                            <AiOutlineLeft className={'icon-ba'}/>
                            Back
                        </p>
                    </div>
                    <h1>User limit</h1>
                </div>
                <div className={styles.userListContainer}>
                <div><button className="btn btn-primary mb-2" onClick={() => handleDownloadExcelFile()}>Export data</button></div>
                <div>
                    {userLimitList.map((item, index) => (
                        <div key={index} className={styles.userItem}>
                            <div className={styles.userDetails}>
                                #{index + 1}: {item.email} : {item.role}
                                <button onClick={() => handleUpdateLimit(item.externalCustomerId)}
                                        className="btn btn-primary mt-4">Update limit
                                </button>
                            </div>
                            <table className={styles.limitTable}>
                                <thead>
                                <tr>
                                    <th>Limit key</th>
                                    <th>Limit value</th>
                                    <th>Monthly current Usage</th>
                                    <th>Amount Usage</th>
                                </tr>
                                </thead>
                                <tbody>
                                {item.limitList.map((limitItem, limitIndex) => (
                                    <tr key={limitIndex}>
                                        <td data-tooltip-id="my-tooltip"
                                            data-tooltip-content={limitItem.limitKey}>{limitItem.limitKey}</td>
                                        <td>
                                            <input
                                                type="text"
                                                value={limitItem.limitValue}
                                                onChange={e => handleChange(index, limitIndex, e.target.value)}
                                            />
                                        </td>
                                        <td>{limitItem.monthlyCurrentUsage}</td>
                                        <td>{limitItem.amountUsage}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                    {showModal && (
                        <div className={styles.modal}>
                            <div className={styles.modalContent}>
                                <span className={styles.closeButton} onClick={handleCloseModal}>&times;</span>
                                <select
                                    value={selectedKey}
                                    onChange={(e) => setSelectedKey(e.target.value)}
                                >
                                    {userLimitKeyList.map((item) => (
                                        <option>{item.limitKey}</option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    value={limitValue}
                                    onChange={e => setLimitValue(e.target.value)}
                                    placeholder="Enter limit value"
                                />
                                <button onClick={() => handleAddLimit(selectedKey, limitValue)}>Add</button>
                            </div>
                        </div>
                    )}
                </div>
                </div>
            </div>
            <Tooltip id="my-tooltip" place="bottom" type="dark" effect="solid" className={styles.customTooltip}/>
        </main>
    );
}

export default UserLimit;
