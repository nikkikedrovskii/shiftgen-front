// В RedirectPage.js
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function RedirectPage() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        const fetchGenerateStrategy = async () => {
            localStorage.removeItem("responseData");
            try {
                const response = await fetch('http://shiftgen-app-env.eba-ymv6peay.eu-north-1.elasticbeanstalk.com/strategy/generate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({
                        analytics: localStorage.getItem("data")
                    }),
                });

                const data = await response.json();
                localStorage.setItem('error',  JSON.stringify(data));
                localStorage.setItem('responseData', JSON.stringify(data.testStrategies));
                window.dispatchEvent(new Event('storage'))
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchGeneratePlan= async () => {
            localStorage.removeItem("responseData");
            try {
                const response = await fetch('http://shiftgen-app-env.eba-ymv6peay.eu-north-1.elasticbeanstalk.com/plan/generate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({
                        analytics: localStorage.getItem("data")
                    }),
                });

                const data = await response.json();
                localStorage.setItem('error',  JSON.stringify(data));
                localStorage.setItem('responseData', JSON.stringify(data.testPlan));
                window.dispatchEvent(new Event('storage'))
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchGenerateUseCase = async () => {
            localStorage.removeItem("responseData");
            try {
                const response = await fetch('http://shiftgen-app-env.eba-ymv6peay.eu-north-1.elasticbeanstalk.com/case/generate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({
                        useCases: localStorage.getItem("data")
                    }),
                });

                const data = await response.json();
                localStorage.setItem('error',  JSON.stringify(data));
                localStorage.setItem('responseData', JSON.stringify(data.testCaseList));
                window.dispatchEvent(new Event('storage'))
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };


        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const action = localStorage.getItem("action");


        localStorage.setItem('token', token);

        if (action === "testCase") {
            fetchGenerateUseCase();
        } else if (action === "testStrategy") {
            fetchGenerateStrategy()
        } else if (action === "testPlan") {
            fetchGeneratePlan()
        }

        navigate('/conditions');
    }, [navigate, location.search]);

    return (
        <div>
            Redirecting...
        </div>
    );
}

export default RedirectPage;
