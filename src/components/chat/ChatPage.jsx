import React, {useEffect, useState} from 'react';
import qinshiftLogo from "../../img/qinshift_logo.svg";
import styles from "../chat/ChatPage.module.css";

function ChatPage({setShowComponent}) {
    const [inputValue, setInputValue] = useState('');
    const [inputText, setInputText] = useState('');
    const [chatMessageList, setChatMessageList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isTextGenerationLimitExceeded, setIsTextGenerationLimitExceeded] = useState(false);

    useEffect(() => {
        const chat = localStorage.getItem('chat');
        const isTextGenerationLimitExceeded = localStorage.getItem('isTextGenerationLimitExceeded');
        if (isTextGenerationLimitExceeded) {
            setIsTextGenerationLimitExceeded(JSON.parse(isTextGenerationLimitExceeded))
        }
        if (chat) {
            const chatJson = JSON.parse(chat);
            setChatMessageList(chatJson);
        }
    }, []);

    const handleSend = async () => {
        const newMessage = {chatRole: 'user', content: inputText};
        const newChatMessageList = [...chatMessageList, newMessage];
        setChatMessageList(newChatMessageList);
        setInputText('');
        console.log(JSON.stringify({
            chatMessageList: newChatMessageList
        }))
        setLoading(true);

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
        console.log(response)
        if (response.status === 200) {
        const responseData = await response.json();
        const lastMessage = responseData.chatMessageList[responseData.chatMessageList.length - 1];
        if (lastMessage) {
            setChatMessageList(currentMessages => {
                const updatedMessages = [...currentMessages, {chatRole: 'QINGPT', content: lastMessage.content}];
                localStorage.setItem('chat', JSON.stringify(updatedMessages));
                return updatedMessages;
            });
        }
        setLoading(false);
    } else {
            const responseData = await response.json();
            setLoading(false);
            if (responseData.message === 'systemError.paymentLimitExceeded') {
                localStorage.setItem('isTextGenerationLimitExceeded', 'true');
                setIsTextGenerationLimitExceeded(true);
            }
        }
    };

    return (
        <main>
            <div>
                <div className={styles.header}>
                    <img src={qinshiftLogo} alt="logo Qinshift" className="brand-logo"
                         onClick={() => setShowComponent('generationPage')}/>
                </div>
                <div className={styles.navigationButtons}>
                    <button className="btn btn-primary custom-button"
                            onClick={() => setShowComponent('dalleChatPage')}>DRAW
                    </button>
                    <button className="btn btn-primary custom-button"
                            onClick={() => setShowComponent('generationPage')}>TaaS
                    </button>
                    <button className="btn btn-primary custom-button"
                            onClick={() => setShowComponent('assistantChatPage')}>DATA
                    </button>
                    <button className="btn btn-primary custom-button"
                            onClick={() => setShowComponent('speechPage')}>SPEECH
                    </button>
                </div>
                <div className={styles.qinGptChatContainer}>
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
                                            onClick={handleSend}
                                            disabled={isTextGenerationLimitExceeded}>Send
                                    </button>
                                    {isTextGenerationLimitExceeded && (
                                        <div style={{ color: 'white', marginTop: '10px' }}>
                                            The text generation limit has been reached. Please contact the administrator.
                                        </div>
                                    )}
                                    {loading && <div className="spinner-border" role="status"
                                                     style={{
                                                         color: 'yellow',
                                                         position: 'absolute',
                                                         right: '70%'
                                                     }}>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>


    );
}

export default ChatPage;
