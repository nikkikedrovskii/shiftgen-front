import React, {useEffect, useState} from 'react';
import qinshiftLogo from '../../img/qinshift_logo.svg';
import {Link, useNavigate} from "react-router-dom";


function Conditions() {

    const [isChecked, setIsChecked] = useState(false);
    const [warningList, setWarningList] = useState([]);
    const token = localStorage.getItem('token');
    const action = localStorage.getItem('action');
    let navigate = useNavigate();

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (action === "testCase") {
            navigate("/case")
        } else if (action === "testStrategy") {
            navigate("/strategy")
        } else if (action === "testPlan") {
            navigate("/plan")
        }
    }

    useEffect(() => {

        async function fetchWarningData() {
            try {
                const response = await fetch('http://shiftgen-env.eba-cigf3qkz.eu-north-1.elasticbeanstalk.com/warning',{
                    headers: {
                        Authorization: `Bearer ${token}`
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
                    <div className="go-back-link">
                        <p className="mb-0"><Link to="/authorization">Back</Link></p>
                    </div>
                    <img src={qinshiftLogo} alt="logo Qinshift" className="ms-auto brand-logo"/>
                </div>
                <form id="podminky" onSubmit={handleSubmit}>
                    <div className="form-group pt-4">
                        <label htmlFor="outputterms">Do not upload following sensitive information:</label>
                        <div className="read-rights pt-3 ps-3 pe-3 pb-3" id="outputterms">
                            {warningList.map((warning, index) => (
                                <div key={index}>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}>{warning.typeOfData}</h4>
                                    <p>{warning.example}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="d-flex pt-4">
                        <div className="form-check me-auto">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value={isChecked}
                                id="agreement"
                                onChange={handleCheckboxChange}
                            />
                            <div><label className="form-check-label" htmlFor="agreement">Label</label>
                                <button style={{ marginLeft: '1100px' }} type="submit" className={`next-step ${isChecked ? '' : 'd-none'}`}>Next</button></div>
                            <p>I confirm that the text I have uploaded does not contain any business-sensitive data. By clicking this confirmation, <br/>
                                I acknowledge that I am solely responsible for ensuring the confidentiality and security of any information shared in this chat. <br/>
                                I understand that sharing sensitive business data in this chat may have legal, financial, or security implications, and I absolve the chatbot, its developers, and its operators from any liability in case of unintentional data exposure. <br/>
                                If I have any doubts about the nature of the information I'm sharing, I will refrain from doing so in this chat. By proceeding, I agree to use this service responsibly and in accordance with all applicable laws and regulations.<br/></p>
                        </div>

                    </div>
                </form>
            </div>
        </main>
    );
}

export default Conditions;
