import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Modal from "../../components/modal/Modal";
import enFlag from "../../img/us.svg";
import czFlag from "../../img/cz.svg";
import {useNavigate} from "react-router-dom";
import {AiOutlineLeft} from "react-icons/ai";

const languageMapping = {
    en: { name: 'English', flag: enFlag, iso639_2: 'EN'},
    cs: { name: 'Czech', flag: czFlag, iso639_2: 'CS' },
};

function Setting() {
    const [selectedLanguage, setSelectedLanguage] = useState({ name: 'Loading...', flag: '' });
    const [isModalOpen, setModalOpen] = useState(false);
    const [originalLanguage, setOriginalLanguage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const tokenObject = localStorage.getItem('token');
                const {value} = JSON.parse(tokenObject);
                const response = await axios.get('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/setting', {
                    headers: {
                        Authorization: `Bearer ${value}`
                    }
                });

                const languageCode = response.data.language;
                const languageData = languageMapping[languageCode.toLowerCase()] || {
                    name: 'Unknown',
                    flag: '/path/to/default-flag.svg',
                };
                setOriginalLanguage(languageData);
                setSelectedLanguage(languageData);
            } catch (error) {
                console.error('Ошибка при загрузке настроек:', error);
            }
        };

        fetchSettings();
    }, []);

    const toggleModal = () => setModalOpen(!isModalOpen);

    const changeLanguage = (language) => {
        if (language) {
            setSelectedLanguage(language);
        }
        setModalOpen(false);
    };
    const isLanguageChanged = () => {
        return selectedLanguage.iso639_2 !== originalLanguage?.iso639_2;
    };

    const handleUpdate = async () => {

        try {
            const tokenObject = localStorage.getItem('token');
            const {value} = JSON.parse(tokenObject);
            console.log("selectedLanguage.iso639_2", selectedLanguage.iso639_2);
            const response = await axios.put('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/setting', { language: selectedLanguage.iso639_2 }, {
                headers: {
                    Authorization: `Bearer ${value}`
                }
            });
            console.log(response.data);
            setOriginalLanguage(selectedLanguage);
            navigate("/")
        } catch (error) {
            console.error('Ошибка при обновлении настроек:', error);
        }
    };

    return (
        <main>
            <div className="container">
                <div className="text-center">
                    <div className="go-back-link" onClick={() => navigate(-1)}>
                        <p className="mb-0">
                            <AiOutlineLeft className={'icon-ba'}/>
                            Back
                        </p>
                    </div>
                    <h1>Setting</h1>
                    <p>version: 1.0.0</p>
                    <p onClick={toggleModal} style={{ fontSize: '1.5rem' }}>
                        Language:
                        <img src={selectedLanguage.flag} alt={`${selectedLanguage.name} Flag`} style={{ width: '30px', marginLeft: '100px', marginRight: '10px' }} />
                        <span style={{ verticalAlign: 'middle' }}>{selectedLanguage.name}</span>
                    </p>
                    <button onClick={handleUpdate} disabled={!isLanguageChanged()}>
                        Update
                    </button>
                </div>
                {isModalOpen && <Modal changeLanguage={changeLanguage} />}
            </div>
        </main>

    );
}

export default Setting;
