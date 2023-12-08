import React, {useState} from 'react';
import qinshiftLogo from "../../img/qinshift_logo.svg";

const ChatPage = () => {
    const [inputValue, setInputValue] = useState('');
    const [inputText, setInputText] = useState('');
    const [chatMessageList, setChatMessageList] = useState([]);

    const handleSend = async () => {
        const newMessage = { chatRole: 'user', content: inputText };
        const newChatMessageList = [...chatMessageList, newMessage];
        setChatMessageList(newChatMessageList);
        setInputText('');

        try {
            const response = await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chatMessageList: newChatMessageList
                })
            });

            const responseData = await response.json();
            const lastMessage = responseData.chatMessageList[responseData.chatMessageList.length - 1];
            if (lastMessage) {
                setChatMessageList(currentMessages => [...currentMessages, { chatRole: 'assistant', content: lastMessage.content }]);

            }

            console.log(chatMessageList)

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
                    <div className="form-group pt-4">
                        <label htmlFor="inputdata">Chat with bot:</label>
                        <textarea
                            className="form-control"
                            id="inputdata"
                            value={displayMessages}
                            onChange={handleInputChange}
                        />
                    </div>
                    <input
                        className="form-control"
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                </form>
                <div className="pt-4 pt-lg-5" style={{ marginLeft: '1100px' }}>
                        <button type="button" className="btn btn-primary custom-button" onClick={handleSend}>Send</button>
                </div>
            </div>
        </main>
    );
};

export default ChatPage;
