import React, { useState } from 'react';
import { ImWarning } from 'react-icons/im';

const WarningInfo = ({ inadmissibleInformationList }) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleMouseEnter = () => {
        setShowPopup(true);
    };

    const handleMouseLeave = () => {
        setShowPopup(false);
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative', display: 'inline-block' }}
        >
            <ImWarning />
            {showPopup && (
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'white',
                        border: '1px solid black',
                        padding: '8px',
                        zIndex: '9999',
                        overflowY: 'auto',
                        maxHeight: '80vh',
                        maxWidth: '80vw',
                    }}
                >
                    {inadmissibleInformationList.map((info, i) => (
                        <div key={i} style={{ borderBottom: '2px solid #ccc', padding: '8px 0' }}>
                            <div>{info.name} {info.description}</div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
};

export default WarningInfo;
