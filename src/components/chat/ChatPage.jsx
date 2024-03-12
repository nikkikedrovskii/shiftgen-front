import React, {useEffect, useState} from 'react';
import qinshiftLogo from "../../img/qinshift_logo.svg";

function ChatPage({ switchToQinImagePage, switchToGenerationPage, switchToAssistantPage }) {
    const [inputValue, setInputValue] = useState('');
    const [inputText, setInputText] = useState('');
    const [chatMessageList, setChatMessageList] = useState([]);

    useEffect(() => {
        const chat = localStorage.getItem('chat');
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
            const response = await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${value}`
                },
                body: JSON.stringify({
                    chatMessageList: newChatMessageList
                })
            });

            const responseData = await response.json();
            const lastMessage = responseData.chatMessageList[responseData.chatMessageList.length - 1];
            if (lastMessage) {
                setChatMessageList(currentMessages => {
                    const updatedMessages = [...currentMessages, { chatRole: 'QINGPT', content: lastMessage.content }];
                    localStorage.setItem('chat', JSON.stringify(updatedMessages));
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
                    <button className="btn btn-primary mx-5 custom-button" onClick={switchToQinImagePage}>DRAW</button>
                    <button className="btn btn-primary custom-button" onClick={switchToGenerationPage}>TaaS</button>
                    {/*<button className="btn btn-primary mx-5 custom-button" onClick={switchToDataAnalystPage}>D&A</button>*/}
                    <button className="btn btn-primary mx-5 custom-button" onClick={switchToAssistantPage}>DATA</button>
                </div>
                <form>
                    <div className="form-group pt-4" style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{flex: 1}}>
                            <label htmlFor="chatbox">Chat with bot:</label>
                            <div className="chat-box" id="chatbox">
                                <div className="chat-messages">
                                    {chatMessageList.map((msg, index) => (
                                        <div key={index} className={`chat-message ${msg.chatRole}`}>
                                            <strong>{msg.chatRole}</strong>: <span className="message-content"
                                                                                   style={{whiteSpace: 'pre-wrap'}}>{msg.content}</span>
                                        </div>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    className="form-control chat-input"
                                    placeholder="Type a message..."
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && inputText.trim() && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    }}
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

export default ChatPage;
