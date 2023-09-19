// В RedirectPage.js
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function RedirectPage() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            localStorage.removeItem("responseData");
            try {
                const response = await fetch('http://shiftgen-app-env.eba-ymv6peay.eu-north-1.elasticbeanstalk.com/strategy/generate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({
                        useCases: localStorage.getItem("useCase")
                    }),
                });

                const data = await response.json();
                localStorage.setItem('responseData', JSON.stringify(data.testStrategyList));
                window.dispatchEvent(new Event('storage'))
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        localStorage.setItem('token', token);

        fetchData();

        navigate('/conditions');
    }, [navigate, location.search]);

    return (
        <div>
            Redirecting...
        </div>
    );
}

export default RedirectPage;
