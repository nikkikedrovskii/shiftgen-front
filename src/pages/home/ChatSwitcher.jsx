import React, {useState} from 'react';
import GenerationPage from "../../components/home/GenerationPage";
import ChatPage from "../../components/chat/ChatPage";
import DalleChatPage from "../../components/dalle/DalleChatPage";
import Assistant from "../../components/assistant/Assistant";
import AssistantCleanArch from "../../components/assistant/AssistantCleanArch";
import SpeechToText from "../../components/speech/SpeechToText";

function GenerationSwitcher() {

    const [showComponent, setShowComponent] = useState('generationPage');

    return (
        <div>
            {showComponent === 'generationPage' && (
                <GenerationPage switchToChatQinGptPage={() => setShowComponent('chatPage')}
                                switchToQinImagePage={() => setShowComponent('dalleChatPage')}
                                switchToAssistantPage={() => setShowComponent('assistantChatPage')}
                                switchToSpeechToTextPage={() => setShowComponent('speechPage')}/>
            )}
            {showComponent === 'chatPage' && (
                <ChatPage switchToGenerationPage={() => setShowComponent('generationPage')}
                          switchToQinImagePage={() => setShowComponent('dalleChatPage')}
                          switchToAssistantPage={() => setShowComponent('assistantChatPage')}
                          switchToSpeechToTextPage={() => setShowComponent('speechPage')}/>
            )}
            {showComponent === 'dalleChatPage' && (
                <DalleChatPage switchToGenerationPage={() => setShowComponent('generationPage')}
                               switchToChatQinGptPage={() => setShowComponent('chatPage')}
                               switchToAssistantPage={() => setShowComponent('assistantChatPage')}
                               switchToSpeechToTextPage={() => setShowComponent('speechPage')}/>
            )}
            {showComponent === 'assistantChatPage' && (
                <AssistantCleanArch switchToGenerationPage={() => setShowComponent('generationPage')}
                             switchToChatQinGptPage={() => setShowComponent('chatPage')}
                             switchToQinImagePage={() => setShowComponent('dalleChatPage')}
                             switchToSpeechToTextPage={() => setShowComponent('speechPage')}/>
            )}
            {showComponent === 'speechPage' && (
                <SpeechToText switchToGenerationPage={() => setShowComponent('generationPage')}
                              switchToChatQinGptPage={() => setShowComponent('chatPage')}
                              switchToQinImagePage={() => setShowComponent('dalleChatPage')}
                              switchToAssistantPage={() => setShowComponent('assistantChatPage')}/>
            )}
        </div>
    );
}

export default GenerationSwitcher;
