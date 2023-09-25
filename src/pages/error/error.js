import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Link} from "react-router-dom";
import qinshiftLogo from "../../img/qinshift_logo.svg";

function Error() {

    return (
        <main>
            <div className="container">
                <div className="d-flex align-items-center">
                    <img src={qinshiftLogo} alt="logo Qinshift" className="ms-auto brand-logo"/>
                </div>
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}>Error.
                        Oops, something wrong, please try again.</h4>
                </div>
            </div>
        </main>
    );
}

export default Error;
