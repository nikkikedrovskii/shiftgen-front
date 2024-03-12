import React, {useEffect, useState} from 'react';
import qinshiftLogo from "../../img/qinshift_logo.svg";

function Assistant({ switchToChatQinGptPage, switchToQinImagePage, switchToGenerationPage }) {

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [file, setFile] = useState(null);
    const [inputText, setInputText] = useState('');
    const [chatMessageList, setChatMessageList] = useState([]);
    const [showMessageList, setShowMessageList] = useState([]);

    useEffect(() => {
        const showChat = localStorage.getItem('showAssistantChat');
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
            const fileId = localStorage.getItem('fileId');
            const assistantId = localStorage.getItem('assistantId');
            const threadId = localStorage.getItem('threadId');

            const {value} = JSON.parse(tokenObject);
            const response = await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/assistant/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${value}`
                },
                body: JSON.stringify({
                    useCases: inputText,
                    fileName: fileId,
                    assistantId: assistantId,
                    threadId: threadId
                })
            });

            const responseData = await response.json();
            const messageList = responseData.chatMessageList;
            setShowMessageList([])
            setShowMessageList(messageList);
            localStorage.setItem('showAssistantChat', JSON.stringify(messageList));
            localStorage.setItem('threadId', responseData.threadId);


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
            const response = await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/assistant/upload', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${value}`
                },
                body: formData
            });
            setIsButtonDisabled(true);
            const responseData = await response.json();
            const newMessage = { chatRole: 'assistant', content: responseData.successResponse };
            const newChatMessageList = [...showMessageList, newMessage];
            setShowMessageList(newChatMessageList);
            localStorage.setItem('assistantId', responseData.assistantId);
            localStorage.setItem('fileId', responseData.fileId);

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
                        accept=".xlsx, .xls .csv"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{display: 'block', marginBottom: '10px'}}
                    />
                    <button className="btn btn-primary" onClick={handleSubmit} disabled={isButtonDisabled}>Upload</button>
                </div>
                <div className="mt-5 text-center">
                    <button className="btn btn-primary mx-5 custom-button" onClick={switchToQinImagePage}>DRAW</button>
                    <button className="btn btn-primary custom-button" onClick={switchToGenerationPage}>TaaS</button>
                    <button className="btn btn-primary mx-5 custom-button" onClick={switchToChatQinGptPage}>QinGPT</button>
                    {/*<button className="btn btn-primary custom-button" onClick={switchToDataAnalystPage}>D&A</button>*/}
                </div>
                <form>
                    <div className="form-group pt-4" style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{flex: 1}}>
                            <label htmlFor="chatbox">Data analyst bot:</label>
                            <div className="chat-box" id="chatbox">
                                <div className="chat-messages">
                                    {showMessageList.map((msg, index) => (
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

export default Assistant;
