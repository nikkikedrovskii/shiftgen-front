import React, {useState} from 'react';
import GenerationPage from "../../components/home/GenerationPage";
import ChatPage from "../../components/chat/ChatPage";
import DalleChatPage from "../../components/dalle/DalleChatPage";
import DataAnalyst from "../../components/data_analyst/DataAnalyst";

function GenerationSwitcher() {

    const [showComponent, setShowComponent] = useState('generationPage');

    return (
        <div>
            {showComponent === 'generationPage' && (
                <GenerationPage switchToChatQinGptPage={() => setShowComponent('chatPage')}
                                switchToQinImagePage={() => setShowComponent('dalleChatPage')}
                                switchToDataAnalystPage={() => setShowComponent('dataAnalystChatPage')}/>
            )}
            {showComponent === 'chatPage' && (
                <ChatPage switchToGenerationPage={() => setShowComponent('generationPage')}
                          switchToQinImagePage={() => setShowComponent('dalleChatPage')}
                          switchToDataAnalystPage={() => setShowComponent('dataAnalystChatPage')}/>
            )}
            {showComponent === 'dalleChatPage' && (
                <DalleChatPage switchToGenerationPage={() => setShowComponent('generationPage')}
                               switchToChatQinGptPage={() => setShowComponent('chatPage')}
                               switchToDataAnalystPage={() => setShowComponent('dataAnalystChatPage')}/>
            )}
            {showComponent === 'dataAnalystChatPage' && (
                <DataAnalyst switchToGenerationPage={() => setShowComponent('generationPage')}
                             switchToChatQinGptPage={() => setShowComponent('chatPage')}
                             switchToQinImagePage={() => setShowComponent('dalleChatPage')}/>
            )}
        </div>
    );
}

export default GenerationSwitcher;
