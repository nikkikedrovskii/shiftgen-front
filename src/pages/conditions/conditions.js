import React, {useState, useEffect} from 'react';
import qinshiftLogo from '../../img/qinshift_logo.svg';
import {useNavigate} from "react-router-dom";


function Conditions() {
    const [isChecked, setIsChecked] = useState(false);
    const [warningList, setWarningList] = useState([]);
    const token = localStorage.getItem('token');
    let navigate = useNavigate();

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/overview")
    }

    useEffect(() => {
        // Функция для получения данных с сервера
        async function fetchWarningData() {
            try {
                const response = await fetch('http://shiftgen-app-env.eba-ymv6peay.eu-north-1.elasticbeanstalk.com/warning',{
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
            <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
            <div className="container">
                <div className="d-flex align-items-center">
                    <div className="go-back-link">
                        <p className="mb-0"><a href="index.html">Back</a></p>
                    </div>
                    <img src={qinshiftLogo} alt="logo Qinshift" className="ms-auto brand-logo"/>
                </div>
                <form id="podminky" onSubmit={handleSubmit}>
                    <div className="form-group pt-4">
                        <div className="read-rights pt-3 ps-3 pe-3 pb-3" id="outputterms">
                            {warningList.map((warning, index) => (
                                <div key={index}>
                                    <h4>{warning.typeOfData}</h4>
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
                            <label className="form-check-label" htmlFor="agreement">Label</label>
                        </div>
                        <button type="submit" className={`next-step ${isChecked ? '' : 'd-none'}`}>Next</button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Conditions;
