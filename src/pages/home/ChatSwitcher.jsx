import React, {useState} from 'react';
import ChatPage from "../../components/chat/ChatPage";
import DalleChatPage from "../../components/dalle/DalleChatPage";
import AssistantCleanArch from "../../components/assistant/AssistantCleanArch";
import SpeechToText from "../../components/speech/SpeechToText";
import GenerationPageV2 from "../../components/home/GenerationPageV2";

function GenerationSwitcher() {

    const [showComponent, setShowComponent] = useState('generationPage');

    return (
        <div>
            {showComponent === 'generationPage' && (
                <GenerationPageV2 setShowComponent={setShowComponent}/>
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
