import React, {useEffect, useState} from 'react';
import qinshiftLogo from "../../img/qinshift_logo.svg";

function ChatPage({ onToggle, switchChecked, onSwitchToggle }) {
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
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        if (e.target.value.length > 0) {
            document.querySelectorAll('button').forEach(s => s.removeAttribute("disabled"))
        }
    }
    const displayMessages = chatMessageList.map(msg => `${msg.chatRole}: ${msg.content}\n`).join('');

    return (
        <main>
            <div className="container">
                <img src={qinshiftLogo} alt="logo Qinshift" className="brand-logo" />
                <form>
                    <div className="form-group pt-4" style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="chatbox">Chat with bot:</label>
                            <div className="chat-box" id="chatbox">
                                <div className="chat-messages">
                                    {chatMessageList.map((msg, index) => (
                                        <div key={index} className={`chat-message ${msg.chatRole}`}>
                                            <strong>{msg.chatRole}</strong>: <span className="message-content" style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</span>
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
                                <button type="button" className="btn btn-primary custom-button" onClick={handleSend}>Send</button>
                            </div>
                        </div>
                        <div style={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
                            <span style={{ marginRight: '10px' }}>Generation</span>
                            <label className="switch">
                                <input type="checkbox" checked={switchChecked} onChange={onSwitchToggle} />
                                <span className="slider"/>
                            </label>
                            <span style={{ marginLeft: '10px' }}>Chat</span>
                        </div>
                    </div>
                </form>
            </div>
        </main>



    );
}

export default ChatPage;
