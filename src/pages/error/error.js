import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Link, useNavigate} from "react-router-dom";
import qinshiftLogo from "../../img/qinshift_logo.svg";

function Error() {
    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate("/")
    };
    return (
        <main>
            <div className="container vh-100 d-flex flex-column">
                <div className="d-flex align-items-center">
                    <img src={qinshiftLogo} alt="logo Qinshift" className="ms-auto brand-logo"/>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center h-100 align-self-center">
                    <h4 style={{
                        fontFamily: 'Elza, Arial, sans-serif',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        fontSize: '24px',
                        lineHeight: '28px',
                        color: '#D08F74',
                        paddingTop: '10px',
                        textAlign: 'center'
                    }}>
                        Error.<br />
                        Something wrong, please try again.
                    </h4>
                    <button onClick={handleRedirect} type="button" className="btn btn-primary mt-3">
                        Try again
                    </button>
                </div>

            </div>
        </main>
    );
}

export default Error;
