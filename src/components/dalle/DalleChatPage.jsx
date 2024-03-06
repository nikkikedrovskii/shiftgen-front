import React, {useEffect, useState} from 'react';
import qinshiftLogo from "../../img/qinshift_logo.svg";

function DalleChatPage({ switchToChatQinGptPage, switchToGenerationPage, switchToAssistantPage }) {
    const [inputValue, setInputValue] = useState('');
    const [inputText, setInputText] = useState('');
    const [chatMessageList, setChatMessageList] = useState([]);

    useEffect(() => {
        const chat = localStorage.getItem('imageChat');
        if (chat) {
            const chatJson = JSON.parse(chat);
            setChatMessageList(chatJson);
        }
    }, []);


    const handleSend = async () => {
        const newMessage = { chatRole: 'user', content: inputText };
        const newChatMessageList = [...chatMessageList, newMessage];
        setChatMessageList(newChatMessageList);
        setInputText('');
        console.log(JSON.stringify({
            chatMessageList: newChatMessageList
        }))

        try {
            const tokenObject = localStorage.getItem('token');
            const {value} = JSON.parse(tokenObject);
            const response = await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/image/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${value}`
                },
                body: JSON.stringify({
                    prompt: inputText
                })
            });

            const responseData = await response.json();
            const lastMessage = responseData.imageUrl;
            if (lastMessage) {
                setChatMessageList(currentMessages => {
                    const updatedMessages = [...currentMessages, { chatRole: 'QINIMAGE', content: lastMessage }];
                    localStorage.setItem('imageChat', JSON.stringify(updatedMessages));
                    return updatedMessages;
                });
            }
        } catch (error) {
            console.error('Ошибка при отправке сообщения:', error);
        }
    };

    return (
        <main>
            <div className="container">
                <img src={qinshiftLogo} alt="logo Qinshift" className="brand-logo"/>
                <div className="text-center">
                    <button className="btn btn-primary mx-5 custom-button" onClick={switchToGenerationPage}>TaaS</button>
                    <button className="btn btn-primary custom-button" onClick={switchToChatQinGptPage}>QinGPT</button>
                    {/*<button className="btn btn-primary mx-5 custom-button" onClick={switchToDataAnalystPage}>D&A</button>*/}
                    <button className="btn btn-primary mx-5 custom-button" onClick={switchToAssistantPage}>DATA</button>
                </div>
                <form>
                    <div className="form-group pt-4" style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{flex: 1}}>
                            <label htmlFor="chatbox">Generate image bot:</label>
                            <div className="chat-box" id="chatbox">
                                <div className="chat-messages">
                                    {chatMessageList.map((msg, index) => (
                                        <div key={index} className={`chat-message ${msg.chatRole}`}>
                                            <strong>{msg.chatRole}</strong>:
                                            {msg.content.startsWith("http") ? (
                                                <img src={msg.content} alt="Chat Image"
                                                     style={{maxWidth: '100%', maxHeight: '300px'}}/>
                                            ) : (
                                                <span className="message-content"
                                                      style={{whiteSpace: 'pre-wrap'}}>{msg.content}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    className="form-control chat-input"
                                    placeholder="Type a message..."
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                />
                            </div>
                            <div className="pt-4 pt-lg-5">
                                <button type="button" className="btn btn-primary custom-button"
                                        onClick={handleSend}>Send
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>


    );
}

export default DalleChatPage;
