import React, {useEffect, useState} from 'react';
import qinshiftLogo from "../../img/qinshift_logo.svg";

function DataAnalyst({ switchToChatQinGptPage, switchToQinImagePage, switchToGenerationPage, switchToAssistantPage }) {

    const [file, setFile] = useState(null);
    const [inputText, setInputText] = useState('');
    const [chatMessageList, setChatMessageList] = useState([]);
    const [showMessageList, setShowMessageList] = useState([]);

    useEffect(() => {
        const chat = localStorage.getItem('dataAnalystChat');
        const showChat = localStorage.getItem('showDataAnalystChat');
        if (chat) {
            const chatJson = JSON.parse(chat);
            setChatMessageList(chatJson);
        }
        if (showChat) {
            const chatJson = JSON.parse(showChat);
            setShowMessageList(chatJson);
        }
    }, []);


    const handleSend = async () => {
        const newMessage = { chatRole: 'user', content: inputText };
        const newChatMessageList = [...chatMessageList, newMessage];
        setChatMessageList(newChatMessageList);
        const newShowChatMessageList = [...showMessageList, newMessage];
        setShowMessageList(newShowChatMessageList);
        setInputText('');

        try {
            const tokenObject = localStorage.getItem('token');
            const {value} = JSON.parse(tokenObject);
            const response = await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/analyst', {
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
                    localStorage.setItem('dataAnalystChat', JSON.stringify(updatedMessages));
                    return updatedMessages;
                });
                setShowMessageList(currentMessages => {
                    const updatedMessages = [...currentMessages, { chatRole: 'QINGPT', content: lastMessage.content }];
                    localStorage.setItem('showDataAnalystChat', JSON.stringify(updatedMessages));
                    return updatedMessages;
                });
            }
        } catch (error) {
            console.error('Ошибка при отправке сообщения:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const tokenObject = localStorage.getItem('token');
            const {value} = JSON.parse(tokenObject);
            const response = await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/upload/file', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${value}`
                },
                body: formData
            });

            const responseData = await response.json();
            setChatMessageList(responseData.chatMessageList)
            console.log(responseData)
            const lastMessage = responseData.chatMessageList[responseData.chatMessageList.length - 1];
          if (lastMessage) {
                setShowMessageList(currentMessages => {
                    const updatedMessages = [...currentMessages, { chatRole: 'QINGPT', content: lastMessage.content }];
                    localStorage.setItem('showDataAnalystChat', JSON.stringify(updatedMessages));
                    return updatedMessages;
                });
            }
        } catch (error) {
            console.error("Error during file upload:", error);
            alert("Error during file upload.");
        }
    };


    return (
        <main>
            <div className="container">
                <img src={qinshiftLogo} alt="logo Qinshift" className="brand-logo"/>
                <div style={{position: 'absolute', top: 0, right: 0, margin: '20px'}}>
                    <input
                        type="file"
                        className="form-control"
                        accept=".xlsx, .xls"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{display: 'block', marginBottom: '10px'}}
                    />
                    <button className="btn btn-primary" onClick={handleSubmit}>Upload</button>
                </div>
                <div className="mt-5 text-center">
                    <button className="btn btn-primary mx-5 custom-button" onClick={switchToQinImagePage}>DRAW</button>
                    <button className="btn btn-primary custom-button" onClick={switchToGenerationPage}>TaaS</button>
                    <button className="btn btn-primary mx-5 custom-button" onClick={switchToChatQinGptPage}>QinGPT</button>
                </div>
                <form>
                    <div className="form-group pt-4" style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{flex: 1}}>
                            <label htmlFor="chatbox">Data analyst bot:</label>
                            <div className="chat-box" id="chatbox">
                                <div className="chat-messages">
                                    {showMessageList.map((msg, index) => (
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

export default DataAnalyst;
