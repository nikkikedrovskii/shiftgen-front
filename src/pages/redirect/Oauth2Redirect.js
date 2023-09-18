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
                    method: 'POST', // Метод запроса может быть другим
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({
                        useCases: "1) Initiating E-commerce Transactions: The primary use case appears to be initiating e-commerce transactions. Users can integrate this solution into their e-commerce websites or applications to enable customers to make purchases securely and efficiently. They can customize the visual design and branding to create a consistent and appealing user experience. 2) Customizing User Experience: Businesses can use this documentation to tailor the payment flow to match their brand identity. They can choose the visual elements, including transition and error screens, colors, and styles, ensuring that the payment process aligns with their brand image. 3) Checking Transaction Status: Users can utilize the 'Transaction Status' endpoint to retrieve information about a specific transaction. This functionality is valuable for order tracking, providing customers with real-time updates on the status of their purchases. 4)Correlation of Requests: The 'Correlation-ID' and 'X-Correlation-ID' parameters are crucial for correlating HTTP requests between the client and server. This helps in tracking and troubleshooting transactions, ensuring that data is consistent and accurate throughout the payment process. 4) Transition to Modern Payment Solutions: Businesses looking to upgrade their existing payment systems or implement a new one can use this documentation to transition to a modern, white-label e-commerce solution that aligns with current industry standards. 5) Backward Compatibility: Users who have previously integrated with the system using the 'X-Correlation-ID' parameter can refer to the documentation for information on transitioning to the preferred 'Correlation-ID' parameter for backward compatibility.",
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

        fetchData(); // Вызов асинхронной функции

        navigate('/conditions');
    }, [navigate, location.search]);

    return (
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
    );
}

export default RedirectPage;
