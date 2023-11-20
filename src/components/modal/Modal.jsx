// Modal.jsx
import React from 'react';
import './Modal.css'; // Путь к CSS файлу для стилизации модального окна
import enFlag from "../../img/us.svg";
import czFlag from "../../img/cz.svg"; // Путь к CSS файлу для стилизации модального окна

const Modal = ({ changeLanguage }) => {

    const languageMapping = {
        en: { name: 'English', flag: enFlag, iso639_2: 'EN'},
        cs: { name: 'Czech', flag: czFlag, iso639_2: 'CS' },
    };
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={() => changeLanguage(null)}>X</button>
                <div className="languages-grid">
                    {Object.values(languageMapping).map(lang => (
                        <div key={lang.name} onClick={() => changeLanguage(lang)}>
                            <img src={lang.flag} alt={`${lang.name} Flag`} />
                            <span>{lang.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Modal;
