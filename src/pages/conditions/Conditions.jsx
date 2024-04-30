import React, {useEffect, useState} from 'react';
import qinshiftLogo from '../../img/qinshift_logo.svg';
import {Link, useNavigate} from "react-router-dom";
import styles from "../conditions/Conditions.module.css";


function Conditions() {

    const [isChecked, setIsChecked] = useState(false);
    const [warningList, setWarningList] = useState([]);
    const tokenObject = localStorage.getItem('token');
    const {value} = JSON.parse(tokenObject);
    let navigate = useNavigate();

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/overview")
    }

    useEffect(() => {

        async function fetchWarningData() {
            try {
                const response = await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/warning', {
                    headers: {
                        Authorization: `Bearer ${value}`
                    }
                });
                const data = await response.json();
                setWarningList(data.warningResponseList);
            } catch (error) {
                console.error('Error fetching warning data:', error);
            }
        }

        fetchWarningData();
    }, []);

    return (
        <main>
            <div className="container">
                <div className="d-flex align-items-center">
                    <img src={qinshiftLogo} alt="logo Qinshift" className="ms-auto brand-logo"/>
                </div>
                <form id="podminky" onSubmit={handleSubmit}>
                    <div className="form-group pt-4">
                        <label htmlFor="outputterms">Do not upload following sensitive information:</label>
                        <div className="read-rights pt-3 ps-3 pe-3 pb-3" id="outputterms">
                            {warningList.map((warning, index) => (
                                <div key={index} className="warning-item">
                                    <h4 className={styles.conditionStyle}>{warning.typeOfData}</h4>
                                    <p>{warning.example}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </form>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '5px'
                }}>
                    <div>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value={isChecked}
                            id="agreement"
                            onChange={handleCheckboxChange} style={{
                            margin: '5px'
                        }}
                        />
                        <label htmlFor="agreement">I confirm</label>
                    </div>
                    <button type="submit" className={`next-step ${isChecked ? '' : 'd-none'}`} style={{
                        right: '0'
                    }}>
                        Next
                    </button>
                </div>
                <div className="d-flex flex-column pt-4">
                    <p> That the text I have uploaded does not contain any business-sensitive data. By clicking
                        this confirmation, <br/>
                        I acknowledge that I am solely responsible for ensuring the confidentiality and security
                        of any information shared in this chat. <br/>
                        I understand that sharing sensitive business data in this chat may have legal,
                        financial, or security implications, and I absolve the chatbot, its developers, and its
                        operators from any liability in case of unintentional data exposure. <br/>
                        If I have any doubts about the nature of the information I'm sharing, I will refrain
                        from doing so in this chat. By proceeding, I agree to use this service responsibly and
                        in accordance with all applicable laws and regulations.<br/></p>
                </div>
            </div>

        </main>
    );
}

export default Conditions;
