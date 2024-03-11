// В RedirectPage.js
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

function RedirectPage() {
    const navigate = useNavigate();
    const location = useLocation();


    const fetchGenerateStrategy = async () => {
        const tokenObject = localStorage.getItem('token');
        const {value} = JSON.parse(tokenObject);
        localStorage.removeItem("responseData");
        try {
            const timeout = setTimeout(() => {
                navigate("/error")
                throw new Error('Timeout Error');
            }, 250000);

            const fileData = localStorage.getItem('uploadedFile');
            let responsePromise;

            if (fileData != null) {
                const formData = getFileObjectFromB64Json()
                responsePromise = await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/strategy/file/generate', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${value}`
                    },
                    body: formData
                });
            } else {
                responsePromise = await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/strategy/generate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${value}`
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
        const tokenObject = localStorage.getItem('token');
        const {value} = JSON.parse(tokenObject);
        localStorage.removeItem("responseData");
        try {
            const timeout = setTimeout(() => {
                navigate("/error")
                throw new Error('Timeout Error');
            }, 250000);


            const fileData = localStorage.getItem('uploadedFile');
            let responsePromise;
            if (fileData != null) {
                const formData = getFileObjectFromB64Json()
                responsePromise = await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/plan/file/generate', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${value}`
                    },
                    body: formData
                });
            } else {
                responsePromise = await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/plan/generate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${value}`,
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

    const fetchGenerateCucumberScript= async () => {
        const tokenObject = localStorage.getItem('token');
        const {value} = JSON.parse(tokenObject);
        localStorage.removeItem("responseData");
        try {
            const timeout = setTimeout(() => {
                navigate("/error")
                throw new Error('Timeout Error');
            }, 250000);

            const responsePromise = await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/script/cucumber/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${value}`,
                },
                body: JSON.stringify({
                    testCases: localStorage.getItem("data")
                }),
            });

            const response = await responsePromise;
            clearTimeout(timeout);

            const data = await response.json();
            if (response.status === 200) {
                localStorage.setItem('responseData', JSON.stringify(data.script));
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

    function getExcelFileObjectFromB64Json() {
        const fileData = localStorage.getItem('uploadedFile');
        const parsedFileData = JSON.parse(fileData);
        const base64String = parsedFileData.base64String;
        const binaryString = atob(base64String);
        const byteArray = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            byteArray[i] = binaryString.charCodeAt(i);
        }
        const fileBlob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const file = new File([fileBlob], parsedFileData.filename);

        const formData = new FormData();
        formData.append('file', file);
        return formData;
    }

    const fetchGenerateUseCase = async () => {
        localStorage.removeItem("responseData");
        const tokenObject = localStorage.getItem('token');
        const {value} = JSON.parse(tokenObject);

        const timeout = setTimeout(() => {
            navigate("/error")
            throw new Error('Timeout Error');
        }, 250000);

        try {
            const fileData = localStorage.getItem('uploadedFile');

            let responsePromise;

            if (fileData != null) {
                const formData = getFileObjectFromB64Json()
                responsePromise = await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/case/file/generate', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${value}`
                    },
                    body: formData
                });
            } else {
                responsePromise  = await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/case/generate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${value}`,
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

    const getTestCaseFromExcel = async () => {
        localStorage.removeItem("responseData");
        const tokenObject = localStorage.getItem('token');
        const {value} = JSON.parse(tokenObject);
        try {

              const formData = getExcelFileObjectFromB64Json()
              const responsePromise = await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/file/test-case', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${value}`
                    },
                    body: formData
                });
              
            const response = await responsePromise;
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




    useEffect(() => {

        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const action = localStorage.getItem("action");

        const externalCustomerId = params.get('externalCustomerId');
        localStorage.setItem('externalCustomerId', externalCustomerId);

        const now = new Date();
        const item = {
            value: token,
            expiry: now.getTime() + 60 * 60000,
        };
        localStorage.setItem('token', JSON.stringify(item));
        const decodedToken = jwtDecode(token)

        localStorage.setItem('email', decodedToken.email);

        if (action === "testCase") {
            fetchGenerateUseCase();
            navigate('/conditions');
        } else if (action === "testStrategy") {
            fetchGenerateStrategy()
            navigate('/conditions');
        } else if (action === "testPlan") {
            fetchGeneratePlan()
            navigate('/conditions');
        } else if (action === "cucumberScript") {
            fetchGenerateCucumberScript()
            navigate('/conditions');
        } else if (action === "scriptFromExcel") {
            getTestCaseFromExcel()
            navigate('/conditions');
        } else {
            navigate('/');
        }

    }, [navigate, location.search]);

    return (
        <div>
            Redirecting...
        </div>
    );
}

export default RedirectPage;
