import React, {useEffect} from 'react';
import qinshiftLogo from '../../img/qinshift_logo.svg';
import microsoftLogo from '../../img/microsoft-logo-png-2415.png';

function Authorization()  {

    useEffect(() => {
        const tokenObject = localStorage.getItem('token');
        if (tokenObject){
            const {value} = JSON.parse(tokenObject);
            window.location.href = 'https://master.d44820iy5gmpk.amplifyapp.com/oauth2/redirect?token=' + value;
        }
    }, []);

    const handleGoogleAuthorization = () => {
       // window.location.href = 'https://shiftgen-env.eba-cigf3qkz.eu-north-1.elasticbeanstalk.com/oauth2/authorization/google';
        window.location.href = 'https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/oauth2/authorization/google';
    }

    const handleOutlookAuthorization = () => {
        // window.location.href = 'https://shiftgen-env.eba-cigf3qkz.eu-north-1.elasticbeanstalk.com/oauth2/authorization/google';
        window.location.href = 'https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/oauth2/authorization/outlook';
    }

    return (
        <main>
            <div className="container">
                <div className="d-flex align-items-center">
                    <div className="go-back-link">
                        <p className="mb-0"><a href="podminky.html">Back</a></p>\
                    </div>
                    <img src={qinshiftLogo} alt="logo Qinshift" className="ms-auto brand-logo" />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={handleGoogleAuthorization}
                    >
                        <img
                            src="https://developers.google.com/identity/images/g-logo.png"
                            alt="Google Logo"
                            style={{ marginRight: '10px', width: '50px', height: '50px' }}
                        />
                        Sign in with Google
                    </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={handleOutlookAuthorization}
                    >
                        <img
                            src={microsoftLogo}
                            alt="Outlook Logo"
                            style={{ marginRight: '10px', width: '50px', height: '50px' }}
                        />
                        Continue with Microsoft Account
                    </button>
                </div>

                <div className="g_id_signin"
                     data-type="standard"
                     data-size="large"
                     data-theme="outline"
                     data-text="sign_in_with"
                     data-shape="rectangular"
                     data-logo_alignment="left">
                </div>
            </div>
        </main>
    );
}

export default Authorization;
