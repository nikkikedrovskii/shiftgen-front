import React from 'react';

const LoginPage = () => {
    const handleLogin = () => {
        window.location.href = 'https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/oauth2/authorization/outlook';
    };

    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={handleLogin}>Login with Outlook</button>
        </div>
    );
};

export default LoginPage;
