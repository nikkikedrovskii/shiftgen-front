import React, {useEffect, useState} from 'react';
import qinshiftLogo from "../../img/qinshift_logo.svg";

function AssistantCleanArch({ setShowComponent }) {

    const [loading, setLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [file, setFile] = useState(null);
    const [inputText, setInputText] = useState('');
    const [showMessageList, setShowMessageList] = useState([]);
    const [threadIdList, setThreadIdList] = useState([])
    const [selectedThreadId, setSelectedThreadId] = useState('');
    const [threadFileNames, setThreadFileNames] = useState([]);
    const prefix = "Download file -> ";

    useEffect(() => {
        fetchUserAssistant();
        fetchThreadFilesName();
    }, []);

    async function fetchUserAssistant() {
        const tokenObject = localStorage.getItem('token');
        if (!tokenObject) return;
        const { value } = JSON.parse(tokenObject);
        const externalCustomerId = localStorage.getItem('externalCustomerId');

        try {
            const response = await fetch(`https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/assistant/${externalCustomerId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${value}`,
                    'Content-Type': 'application/json'
                },
            });

            const data = await response.json();
            localStorage.setItem('assistantId', data.assistantId);
            setThreadIdList(data.assistantThreadIdList)
            setSelectedThreadId(data.assistantThreadIdList[0])
            getThreadMessageByThreadId(data.assistantThreadIdList[0])
            localStorage.setItem('threadId', data.assistantThreadIdList[0]);
            return data;
        } catch (error) {
            console.error("Failed to fetch thread source:", error);
            throw error;
        }
    }

    async function fetchThreadFilesName() {
        const tokenObject = localStorage.getItem('token');
        if (!tokenObject) return;
        const { value } = JSON.parse(tokenObject);
        const threadId = localStorage.getItem('threadId');

        try {
            const response = await fetch(`https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/thread/${threadId}/file`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${value}`,
                    'Content-Type': 'application/json'
                },
            });

            const data = await response.json();
            setThreadFileNames(data.connectedThreadFilesName)
        } catch (error) {
            console.error("Failed to fetch thread source:", error);
            throw error;
        }
    }


    const handleSend = async () => {
        setLoading(true);
        const newMessage = { chatRole: 'user', content: inputText };

        setShowMessageList(prevMessages => [...prevMessages, newMessage]);
        setInputText('');

        const assistantId = localStorage.getItem('assistantId');
        const threadId = localStorage.getItem('threadId');

        try {
            const tokenObject = getToken();
            const response = await fetch(`https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/assistant/${assistantId}/thread/${threadId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${tokenObject}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: newMessage.content
                })
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            const responseData = await response.json();
            const messageList = responseData.chatMessageList;

            setShowMessageList([])

            setShowMessageList(prevMessages => [...prevMessages, ...messageList]);
        } catch (error) {
            console.error("Failed to post thread source:", error);
        } finally {
            setLoading(false);
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await uploadFileToAssistantStorage(file);
        await connectFileToSelectedThread(response)
        const threadFileId = response.id;
        console.log(threadFileId);
    };

    async function uploadFileToAssistantStorage(file) {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        const tokenValue = getToken();

        try {
            const response = await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/assistant/storage', {
                method: 'POST',
                headers: {Authorization: `Bearer ${tokenValue}`},
                body: formData,
            });
            setIsButtonDisabled(true);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    }


    async function getThreadMessageByThreadId(threadId) {
        if (threadId != null) {
            setSelectedThreadId(threadId)
            localStorage.setItem('threadId', threadId);
            fetchThreadFilesName();
            try {
                const tokenObject = getToken();
                const response = await fetch(`https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/assistant/${threadId}/messages`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${tokenObject}`,
                        'Content-Type': 'application/json'
                    },
                });

                const data = await response.json();
                setShowMessageList(data.chatMessageList)
                return data;
            } catch (error) {
                console.error("Failed to fetch thread source:", error);
                throw error;
            }
        }
    }

    async function connectFileToSelectedThread(uploadedFile) {


        const newMessage = { chatRole: 'assistant', content: `File ${uploadedFile.fileName} uploaded. Ask a question, please.` };
        const newChatMessageList = [...showMessageList, newMessage];
        setShowMessageList(newChatMessageList);


        const requestBody = JSON.stringify({
            fileId: uploadedFile.id,
            fileName: uploadedFile.fileName,
            contentType: uploadedFile.contentType
        });

        try {
            const tokenObject = getToken();
            await fetch(`https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/thread/${selectedThreadId}/source`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${tokenObject}`,
                    'Content-Type': 'application/json',
                },
                body: requestBody,
            });
            const newThreadFileNames = [...threadFileNames, uploadedFile.fileName];
            setThreadFileNames(newThreadFileNames);

        } catch (error) {
            console.error("Failed to post thread source:", error);
            throw error;
        }

    }

    async function createAssistantThread() {
        const assistantId = localStorage.getItem('assistantId');

        try {
            const tokenObject = getToken();
            const response =  await fetch(`https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/assistant/${assistantId}/thread`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${tokenObject}`,
                    'Content-Type': 'application/json',
                }
            });
            const responseData = await response.json();
            const newThreadIdList = [...threadIdList, responseData.assistantThreadId];
            setThreadIdList(newThreadIdList);
            setSelectedThreadId(responseData.assistantThreadId)
            setShowMessageList([])
            localStorage.setItem('threadId', responseData.assistantThreadId);
            fetchThreadFilesName();
        } catch (error) {
            console.error("Failed to post thread source:", error);
            throw error;
        }

    }
    const handleDownloadTranscription = (fileName) => {

        const tokenObject = localStorage.getItem('token');

        if (!tokenObject) return;
        const { value } = JSON.parse(tokenObject);

        const externalCustomerId = localStorage.getItem('externalCustomerId');

        if (fileName) {
            const params = new URLSearchParams({
                fileType: "TEXT_FILE"
            }).toString();

            fetch(`https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/user/${externalCustomerId}/file/${encodeURIComponent(fileName)}?${params}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${value}`,
                }
            })
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(new Blob([blob]));
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                })
                .catch(error => console.error('Ошибка:', error));
        }
    };

    async function deleteAssistantThread() {
        console.log(" delete thread this selectedId " + selectedThreadId)
        try {
            const tokenObject = getToken();
            await fetch(`https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/thread/${selectedThreadId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${tokenObject}`,
                    'Content-Type': 'application/json',
                }
            });
            const updatedThreadIdList = threadIdList.filter(threadId => threadId !== selectedThreadId);
            if (updatedThreadIdList.length === 0)
            {
                setThreadIdList([]);
            } else {
                setThreadIdList(updatedThreadIdList);
                setSelectedThreadId(updatedThreadIdList[0])
                localStorage.setItem('threadId', updatedThreadIdList[0]);
                getThreadMessageByThreadId(updatedThreadIdList[0])
            }
        } catch (error) {
            console.error("Failed to post thread source:", error);
            throw error;
        }

    }

    function getToken() {
        const tokenObject = localStorage.getItem('token');
        const { value } = JSON.parse(tokenObject);
        return value;
    }

    return (
        <main>
            <div className="container">
                <img src={qinshiftLogo} alt="logo Qinshift" className="brand-logo" onClick={() => setShowComponent('generationPage')}/>
                <div style={{position: 'absolute', top: 0, right: 0, margin: '20px'}}>
                    <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{display: 'block', marginBottom: '10px'}}
                    />
                    <button className="btn btn-primary" onClick={handleSubmit}>Upload</button>
                </div>
                <div className="white-window" style={{
                    position: 'absolute',
                    top: '60px',
                    right: '20px',
                    backgroundColor: 'white',
                    padding: '10px',
                    borderRadius: '5px',
                    boxShadow: '0px 0px 5px rgba(0,0,0,0.2)',
                    width: '200px',
                    overflow: 'hidden',
                    maxHeight: '300px'
                }}>
                    <div style={{color: 'black', marginBottom: '10px'}}>Uploaded files:</div>
                    {threadFileNames.map((fileName, index) => (
                        <div key={index} style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}>{fileName}</div>
                    ))}
                </div>
                <div className="mt-5 text-center">
                    <button className="btn btn-primary mx-5 custom-button" onClick={() => setShowComponent('dalleChatPage')}>DRAW</button>
                    <button className="btn btn-primary custom-button" onClick={() => setShowComponent('generationPage')}>TaaS</button>
                    <button className="btn btn-primary mx-5 custom-button" onClick={() => setShowComponent('chatPage')}>QinGPT</button>
                    <button className="btn btn-primary custom-button" onClick={() => setShowComponent('speechPage')}>SPEECH</button>
                </div>
                <form>
                    <div className="form-group pt-4" style={{alignItems: 'center'}}>
                        <div style={{flex: 1, position: 'relative', width: '85%'}}>
                            <label htmlFor="chatbox">Data analyst bot:</label>
                            <div style={{
                                position: 'absolute',
                                right: 0,
                                top: '-10px',
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                <select
                                    className="form-control"
                                    value={selectedThreadId}
                                    onChange={(e) => getThreadMessageByThreadId(e.target.value)}
                                >
                                    {threadIdList.map((threadId, index) => (
                                        <option key={index} value={threadId}>
                                            {threadId}
                                        </option>
                                    ))}
                                </select>
                                <button type="button" className="btn btn-primary mr-2 mx-2"
                                        onClick={createAssistantThread}>+
                                </button>
                                <button type="button" className="btn btn-primary" onClick={deleteAssistantThread}>-
                                </button>
                            </div>
                            <div className="chat-box" id="chatbox">
                                <div className="chat-messages">
                                    {showMessageList.map((msg, index) => (
                                        <div key={index} className={`chat-message ${msg.chatRole}`}>
                                            <strong>{msg.chatRole}</strong>:
                                            {
                                                msg.content.startsWith("http") ?
                                                    (<img src={msg.content} alt="Chat Image" style={{maxWidth: '100%', maxHeight: '300px'}}/>) :
                                                    (msg.content.startsWith(prefix) ?
                                                        (<span className="message-content" style={{whiteSpace: 'pre-wrap'}}>
                                                               <div
                                                                   onClick={() => handleDownloadTranscription(msg.content.slice(prefix.length))}
                                                                   style={{
                                                                       cursor: 'pointer',
                                                                       textDecoration: 'underline',
                                                                       color: 'blue'
                                                                   }}
                                                               >{msg.content.slice(prefix.length)}</div></span>) :
                                                        (<span className="message-content" style={{whiteSpace: 'pre-wrap'}}>{msg.content}</span>))
                                            }
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
                            <div className="pt-4">
                                <button type="button" className="btn btn-primary custom-button"
                                        onClick={handleSend}>Send
                                </button>
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
        </main>
    );
}

export default AssistantCleanArch;
