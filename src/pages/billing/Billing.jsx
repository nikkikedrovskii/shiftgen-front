import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {AiOutlineLeft} from "react-icons/ai";

function Billing() {

    const [amount, setAmount] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const tokenObject = localStorage.getItem('token');
        const {value} = JSON.parse(tokenObject);
        async function fetchWarningData() {
            const response = await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/billing', {
                headers: {
                    Authorization: `Bearer ${value}`
                }
            })

            const data = await response.json();

            console.log(data)
            setAmount(data);

        }

        fetchWarningData();
    }, []);

    return (
        <main>
            <div className="container">
                <div className="text-center">
                    <div className="go-back-link" onClick={() => navigate(-1)}>
                        <p className="mb-0">
                            <AiOutlineLeft className={'icon-ba'}/>
                            Back
                        </p>
                    </div>
                    <h1>Billing</h1>
                    <p>
                        Amount:
                        <span style={{ verticalAlign: 'middle', width: '30px', marginLeft: '100px', marginRight: '10px'}}>{amount.amount} $</span>
                    </p>
                </div>
            </div>
        </main>

    );
}

export default Billing;
