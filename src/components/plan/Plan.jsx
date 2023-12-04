import React, {useContext, useEffect, useState} from 'react';
import {TimerContext} from "../../pages/timer/TimerProvider.js";
import PageHeader from "../page_header/PageHeader";

function Plan() {
    const [responseData, setResponseData] = useState([]);
    const [responseStorage, setResponseStorage] = useState("");
    const languages = ["cypress", "python", "playwright"];
    const [planData, setPlanData] = useState('');
    const seconds = useContext(TimerContext);
    const [isVisible, setIsVisible] = useState(true);
    const [fileData, setFileData] = useState(null);

    useEffect(() => {

        const base64String = localStorage.getItem('uploadedFile');
        setFileData(base64String);

        const storedData = JSON.parse(localStorage.getItem('responseData'));
        if (storedData) {
            hideBlock();
            let formattedString = storedData.replace(/\n/g, '<br>');
            setPlanData(formattedString);
        }

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const hideBlock = () => {
        setIsVisible(false);
    };
    const handleStorageChange = async (e) => {
        const storedData = JSON.parse(localStorage.getItem('responseData'));
        if (storedData) {
            hideBlock();
            let formattedString = storedData.replace(/\n/g, '<br>');
            setPlanData(formattedString);
            setResponseStorage(storedData);
        }
    }
    const copyContent = async () => {
        try {
            const outputdata = document.getElementById('outputdata');
            await navigator.clipboard.writeText(outputdata.innerText);
            console.log('Content copied to clipboard');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <main>
            <div className="container">
                <PageHeader />
                <form id="inputarea">
                    <div className="form-group pt-4">
                        <label htmlFor="outputdata" style={{ display: 'flex', alignItems: 'center' }}>
                            Your test plan:
                            {isVisible && <div style={{ marginLeft: '1000px' }}>In progress: {seconds}</div>}
                        </label>
                        <div className="read-rights pt-3 ps-3 pe-3 pb-3" id="outputdata" >
                            <p dangerouslySetInnerHTML={{ __html: planData }} />
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Plan;
