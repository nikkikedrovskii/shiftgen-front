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
                const timeout = setTimeout(() => {
                    navigate("/error")
                    throw new Error('Timeout Error');
                }, 90000);

                const fileData = localStorage.getItem('uploadedFile');
                let responsePromise;

                if (fileData != null) {
                    const formData = getFileObjectFromB64Json()
                    responsePromise = await fetch('http://shiftgen-env.eba-cigf3qkz.eu-north-1.elasticbeanstalk.com/strategy/file/generate', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: formData
                    });
                } else {
                     responsePromise = await fetch('http://shiftgen-env.eba-cigf3qkz.eu-north-1.elasticbeanstalk.com/strategy/generate', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({
                            analytics: localStorage.getItem("data")
                        }),
                    });
                }


                const response = await responsePromise;
                clearTimeout(timeout);

                const data = await response.json();

                if (response.status === 200) {
                    localStorage.setItem('responseData', JSON.stringify(data.testStrategies));
                    window.dispatchEvent(new Event('storage'))
                } else {
                    localStorage.setItem('error', JSON.stringify(data));
                    navigate("/error")
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchGeneratePlan = async () => {
            localStorage.removeItem("responseData");
            try {
                const timeout = setTimeout(() => {
                    navigate("/error")
                    throw new Error('Timeout Error');
                }, 90000);


                const fileData = localStorage.getItem('uploadedFile');
                let responsePromise;
                if (fileData != null) {
                    const formData = getFileObjectFromB64Json()
                     responsePromise = await fetch('http://shiftgen-env.eba-cigf3qkz.eu-north-1.elasticbeanstalk.com/plan/file/generate', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: formData
                    });
                } else {
                     responsePromise = await fetch('http://shiftgen-env.eba-cigf3qkz.eu-north-1.elasticbeanstalk.com/plan/generate', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                        body: JSON.stringify({
                            analytics: localStorage.getItem("data")
                        }),
                    });
                }

                const response = await responsePromise;
                clearTimeout(timeout);

                const data = await response.json();
                if (response.status === 200) {
                    localStorage.setItem('responseData', JSON.stringify(data.testPlan));
                    window.dispatchEvent(new Event('storage'))
                } else {
                    localStorage.setItem('error', JSON.stringify(data));
                    navigate("/error")
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        function getFileObjectFromB64Json() {
           const fileData = localStorage.getItem('uploadedFile');
           const parsedFileData = JSON.parse(fileData);
           const base64String = parsedFileData.base64String;
           const binaryString = atob(base64String);
           const byteArray = new Uint8Array(binaryString.length);
           for (let i = 0; i < binaryString.length; i++) {
               byteArray[i] = binaryString.charCodeAt(i);
           }
           const fileBlob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
           const file = new File([fileBlob], parsedFileData.filename);

           const formData = new FormData();
           formData.append('file', file);
           return formData;
       }

        const fetchGenerateUseCase = async () => {
            localStorage.removeItem("responseData");

            const timeout = setTimeout(() => {
                navigate("/error")
                throw new Error('Timeout Error');
            }, 120000);

            try {
                const fileData = localStorage.getItem('uploadedFile');

                let responsePromise;

                if (fileData != null) {
                    const formData = getFileObjectFromB64Json()
                    responsePromise = await fetch('http://shiftgen-env.eba-cigf3qkz.eu-north-1.elasticbeanstalk.com/case/file/generate', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: formData
                    });
                } else {
                     responsePromise  = await fetch('http://shiftgen-env.eba-cigf3qkz.eu-north-1.elasticbeanstalk.com/case/generate', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                        body: JSON.stringify({
                            useCases: localStorage.getItem("data")
                        }),
                    });
                }


                const response = await responsePromise;
                clearTimeout(timeout);
                const data = await response.json();
                if (response.status === 200) {
                    localStorage.setItem('responseData', JSON.stringify(data.testCaseList));
                    window.dispatchEvent(new Event('storage'))
                } else {
                    localStorage.setItem('error', JSON.stringify(data));
                    navigate("/error")
                }
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
