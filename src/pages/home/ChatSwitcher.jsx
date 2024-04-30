import React, {useState} from 'react';
import SpeechToText from "../../components/speech/SpeechToText";
import GenerationPage from "../../components/home/GenerationPage";
import DalleChatPage from "../../components/dalle/DalleChatPage";
import AssistantCleanArch from "../../components/assistant/AssistantCleanArch";
import ChatPage from "../../components/chat/ChatPage";

function GenerationSwitcher() {

    const [showComponent, setShowComponent] = useState('generationPage');

    return (
        <div>
            {showComponent === 'generationPage' && (
                <GenerationPage setShowComponent={setShowComponent}/>
            )}
            {showComponent === 'chatPage' && (
                <ChatPage setShowComponent={setShowComponent}/>
            )}
            {showComponent === 'dalleChatPage' && (
                <DalleChatPage setShowComponent={setShowComponent}/>
            )}
            {showComponent === 'assistantChatPage' && (
                <AssistantCleanArch setShowComponent={setShowComponent}/>
            )}
            {showComponent === 'speechPage' && (
                <SpeechToText setShowComponent={setShowComponent}/>
            )}
        </div>
    );
}

export default GenerationSwitcher;
