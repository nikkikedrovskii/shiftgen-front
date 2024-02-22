import React, {useState} from 'react';
import GenerationPage from "../../components/home/GenerationPage";
import ChatPage from "../../components/chat/ChatPage";
import DalleChatPage from "../../components/dalle/DalleChatPage";
import Assistant from "../../components/assistant/Assistant";

function GenerationSwitcher() {

    const [showComponent, setShowComponent] = useState('generationPage');

    return (
        <div>
            {showComponent === 'generationPage' && (
                <GenerationPage switchToChatQinGptPage={() => setShowComponent('chatPage')}
                                switchToQinImagePage={() => setShowComponent('dalleChatPage')}
                                switchToDataAnalystPage={() => setShowComponent('dataAnalystChatPage')}
                                switchToAssistantPage={() => setShowComponent('assistantChatPage')}/>
            )}
            {showComponent === 'chatPage' && (
                <ChatPage switchToGenerationPage={() => setShowComponent('generationPage')}
                          switchToQinImagePage={() => setShowComponent('dalleChatPage')}
                          switchToDataAnalystPage={() => setShowComponent('dataAnalystChatPage')}
                          switchToAssistantPage={() => setShowComponent('assistantChatPage')}/>
            )}
            {showComponent === 'dalleChatPage' && (
                <DalleChatPage switchToGenerationPage={() => setShowComponent('generationPage')}
                               switchToChatQinGptPage={() => setShowComponent('chatPage')}
                               switchToDataAnalystPage={() => setShowComponent('dataAnalystChatPage')}
                               switchToAssistantPage={() => setShowComponent('assistantChatPage')}/>
            )}
{/*            {showComponent === 'dataAnalystChatPage' && (
                <DataAnalyst switchToGenerationPage={() => setShowComponent('generationPage')}
                             switchToChatQinGptPage={() => setShowComponent('chatPage')}
                             switchToQinImagePage={() => setShowComponent('dalleChatPage')}
                             switchToAssistantPage={() => setShowComponent('assistantChatPage')}/>
            )}*/}
            {showComponent === 'assistantChatPage' && (
                <Assistant switchToGenerationPage={() => setShowComponent('generationPage')}
                             switchToChatQinGptPage={() => setShowComponent('chatPage')}
                             switchToQinImagePage={() => setShowComponent('dalleChatPage')}
                             switchToDataAnalystPage={() => setShowComponent('dataAnalystChatPage')}/>
            )}
        </div>
    );
}

export default GenerationSwitcher;
