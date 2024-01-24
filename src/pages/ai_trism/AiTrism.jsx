import React, {useEffect, useState} from 'react';
import {AiOutlineLeft} from "react-icons/ai";
import {useNavigate} from "react-router-dom";

function AiTrism() {

    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/regular/answer')
            .then(response => response.json())
            .then(data => {
                setData(data.regularPromptAnswerResponses);
            })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
            });
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
                    <h1>AI TRiSM</h1>
                    <table className="ai-comparison-table">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Prompt</th>
                            <th>Answer AZURE AI</th>
                            <th>Answer CHAT GPT AI</th>
                            <th>Expected answer</th>
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
                        </tbody>
                    </table>
                </div>
            </div>
        </main>

    );
}

export default AiTrism;
