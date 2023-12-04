import React from 'react';
import GenerationPage from "../../components/home/GenerationPage";
import {useState} from "react";
import ChatPage from "../../components/chat/ChatPage";


function Home() {
    const [showChat, setShowChat] = useState(false);

    const toggleSwitch = () => {
        setShowChat(!showChat);
    };

    return (
        <div>
            {showChat ? <ChatPage switchChecked={showChat} onSwitchToggle={toggleSwitch} />
                : <GenerationPage switchChecked={showChat} onSwitchToggle={toggleSwitch} />}
        </div>
    );
}

export default Home;
