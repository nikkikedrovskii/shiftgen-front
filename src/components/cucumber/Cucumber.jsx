import React, {useContext, useEffect, useState} from 'react';
import qinshiftLogo from '../../img/qinshift_logo.svg';
import {Link} from 'react-router-dom';
import {TimerContext} from "../../pages/timer/TimerProvider.js";
import PageHeader from "../page_header/PageHeader";


function Cucumber() {
    const [responseStorage, setResponseStorage] = useState("");
    const [cucumberScript, setCucumberScript] = useState('');
    const seconds = useContext(TimerContext);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {

        const storedData = JSON.parse(localStorage.getItem('responseData'));
        if (storedData) {
            hideBlock();
            let formattedString = storedData.replace(/\n/g, '<br>');
            setCucumberScript(formattedString);
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
            setCucumberScript(formattedString);
        }
    }

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
                            <p dangerouslySetInnerHTML={{ __html: cucumberScript }} />
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Cucumber;
