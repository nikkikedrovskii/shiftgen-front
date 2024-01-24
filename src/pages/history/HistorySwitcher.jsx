import React, {useState} from 'react';
import FileHistoryPage from "../../components/history/file_history/FileHistoryPage";
import ImageHistoryPage from "../../components/history/image_history/ImageHistoryPage";

function HistorySwitcher() {

    const [showComponent, setShowComponent] = useState('file');

    return (
        <div>
            {showComponent === 'file' ? (
                <FileHistoryPage switchToImage={() => setShowComponent('image')}/>
            ) : (
                <ImageHistoryPage switchToFile={() => setShowComponent('file')}/>
            )}
        </div>
    );
}

export default HistorySwitcher;
