import React from 'react';
import qinshiftLogo from '../../img/qinshift_logo.svg';

function Authorization()  {

    const handleGoogleAuthorization = () => {
       // window.location.href = 'http://localhost:5000/oauth2/authorization/google';
        window.location.href = 'http://shiftgen-app-env.eba-ymv6peay.eu-north-1.elasticbeanstalk.com/oauth2/authorization/google';
    }

    return (
        <main>
            <div className="container">
                <div className="d-flex align-items-center">
                    <div className="go-back-link">
                        <p className="mb-0"><a href="podminky.html">Back</a></p>
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
                            style={{ marginRight: '10px' }}
                        />
                        Sign in with Google
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
