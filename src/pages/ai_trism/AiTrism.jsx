import React, {useEffect, useState} from 'react';
import {AiOutlineLeft} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import styles from "../ai_trism/AiTrism.module.css";

function AiTrism() {

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [azureAiApiCallSuccessRate, setAzureAiApiCallSuccessRate] = useState('');
    const [openedGptApiCallSuccessRate, setOpenedGptApiCallSuccessRate] = useState('');

    useEffect(() => {
        fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/regular/answer')
            .then(response => response.json())
            .then(data => {
                setData(data.regularPromptAnswerResponses);
                setAzureAiApiCallSuccessRate(data.azureAiApiCallSuccessRate)
                setOpenedGptApiCallSuccessRate(data.openedGptApiCallSuccessRate)
            })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
            });
    }, []);


    return (
        <main>
            <div>
                <div style={{
                    textAlign: "center"
                }}>
                    <div className="go-back-link" onClick={() => navigate(-1)}>
                        <p className="mb-0">
                            <AiOutlineLeft className={'icon-ba'}/>
                            Back
                        </p>
                    </div>
                    <h1>AI TRiSM</h1>
                </div>
                <div className={styles.tableContainer}>
                    <table className={styles.aiComparisonTable}>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Prompt</th>
                            <th>Answer AZURE AI {azureAiApiCallSuccessRate} %</th>
                            <th>Answer CHAT GPT AI {openedGptApiCallSuccessRate} %</th>
                            <th>Expected answer 100 %</th>
                            <th>Match</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.date}</td>
                                <td>{item.prompt}</td>
                                <td>{item.answerAzureAi}</td>
                                <td>{item.answerChatGptApi}</td>
                                <td>{item.expectedAnswer}</td>
                                <td>{item.difference}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="2">Trustworthliness</td>
                            <td>{azureAiApiCallSuccessRate} %</td>
                            <td>{openedGptApiCallSuccessRate} %</td>
                            <td>100 %</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>

    );
}

export default AiTrism;
