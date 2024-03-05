import React, {useState} from 'react';
import GenerationPage from "../../components/home/GenerationPage";
import ChatPage from "../../components/chat/ChatPage";
import DalleChatPage from "../../components/dalle/DalleChatPage";
import Assistant from "../../components/assistant/Assistant";
import AssistantCleanArch from "../../components/assistant/AssistantCleanArch";

function GenerationSwitcher() {

    const [showComponent, setShowComponent] = useState('generationPage');

    return (
        <div>
            {showComponent === 'generationPage' && (
                <GenerationPage switchToChatQinGptPage={() => setShowComponent('chatPage')}
                                switchToQinImagePage={() => setShowComponent('dalleChatPage')}
                                switchToAssistantPage={() => setShowComponent('assistantChatPage')}
                                switchToDaV2Page={() => setShowComponent('DaV2Page')}/>
            )}
            {showComponent === 'chatPage' && (
                <ChatPage switchToGenerationPage={() => setShowComponent('generationPage')}
                          switchToQinImagePage={() => setShowComponent('dalleChatPage')}
                          switchToAssistantPage={() => setShowComponent('assistantChatPage')}/>
            )}
            {showComponent === 'dalleChatPage' && (
                <DalleChatPage switchToGenerationPage={() => setShowComponent('generationPage')}
                               switchToChatQinGptPage={() => setShowComponent('chatPage')}
                               switchToAssistantPage={() => setShowComponent('assistantChatPage')}/>
            )}
            {showComponent === 'assistantChatPage' && (
                <Assistant switchToGenerationPage={() => setShowComponent('generationPage')}
                             switchToChatQinGptPage={() => setShowComponent('chatPage')}
                             switchToQinImagePage={() => setShowComponent('dalleChatPage')}/>
            )}
            {showComponent === 'DaV2Page' && (
                <AssistantCleanArch/>
            )}
        </div>
    );
}

export default GenerationSwitcher;
