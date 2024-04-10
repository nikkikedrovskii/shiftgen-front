import React from 'react';
import qinshiftLogo from "../../img/qinshift_logo.svg";
import {useNavigate} from "react-router-dom";

function Logo() {

    const navigate = useNavigate();

    return (
            <img src={qinshiftLogo} alt="logo Qinshift" className="brand-logo" onClick={() => navigate('/')}/>
    );
}

export default Logo;
