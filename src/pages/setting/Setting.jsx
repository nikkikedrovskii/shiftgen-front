import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Modal from "../../components/modal/Modal";
import enFlag from "../../img/us.svg";
import czFlag from "../../img/cz.svg";
import {useNavigate} from "react-router-dom";
import {AiOutlineLeft} from "react-icons/ai";
import styles from "../setting/Setting.module.css";

const languageMapping = {
    en: {name: 'English', flag: enFlag, iso639_2: 'EN'},
    cs: {name: 'Czech', flag: czFlag, iso639_2: 'CS'},
};

function Setting() {
    const [selectedLanguage, setSelectedLanguage] = useState({name: 'Loading...', flag: ''});
    const [isModalOpen, setModalOpen] = useState(false);
    const [originalLanguage, setOriginalLanguage] = useState(null);
    const [posts, setPosts] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        console.log(posts)
        fetchBannedWordResponseList();
    }, [])

    async function fetchBannedWordResponseList() {
        const tokenObject = localStorage.getItem('token');
        const {value} = JSON.parse(tokenObject);
        const response = await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/regular/prompt', {
            headers: {
                Authorization: `Bearer ${value}`
            }
        });
        const data = await response.json();
        console.log(data)
        setPosts(data.regularPromptResponseList);
    }

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
            const response = await axios.put('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/setting', {language: selectedLanguage.iso639_2}, {
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
    const handleSave = async () => {
        const tokenObject = localStorage.getItem('token');
        const {value} = JSON.parse(tokenObject);
        const promptValue = document.getElementById('prompt').value;
        const expectedAnswerValue = document.getElementById('expectedAnswer').value;
        const iterationValue = document.getElementById('iteration').value;

        const dataToSend = {
            prompt: promptValue,
            expectedAnswer: expectedAnswerValue,
            iteration: iterationValue,
        };
        await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/regular/prompt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${value}`
            },
            body: JSON.stringify(dataToSend),
        });
        fetchBannedWordResponseList();
    };

    const handleUpdateRegularPrompt = async (item) => {
        try {
            const response = await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/regular/prompt', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            fetchBannedWordResponseList();
        } catch (error) {
            console.error('Error during update:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/regular/prompt/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Удаляем элемент из списка в интерфейсе
            setPosts(currentData => currentData.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error during delete:', error);
        }
        fetchBannedWordResponseList();
    };

    const handleChange = (id, field, value) => {
        setPosts(currentData =>
            currentData.map(item =>
                item.id === id ? {...item, [field]: value} : item
            )
        );
    };

    return (
        <main>
            <div>
                <div className="text-center">
                    <div className="go-back-link" onClick={() => navigate(-1)}>
                        <p className="mb-0">
                            <AiOutlineLeft className={'icon-ba'}/>
                            Back
                        </p>
                    </div>
                    <h1>Setting</h1>
                    <p>version: 1.0.0</p>
                    <p onClick={toggleModal} style={{fontSize: '1.5rem'}}>
                        Language:
                        <img src={selectedLanguage.flag} alt={`${selectedLanguage.name} Flag`}
                             style={{width: '30px', marginLeft: '100px', marginRight: '10px'}}/>
                        <span style={{verticalAlign: 'middle'}}>{selectedLanguage.name}</span>
                    </p>
                    <button onClick={handleUpdate} disabled={!isLanguageChanged()}>
                        Update
                    </button>
                </div>
                <h1 className="text-center">AI TRiSM Setting:</h1>
                <div className={styles.trismSetting}>
                        <input type="text" className="form-input" placeholder="Prompt" id="prompt"/>
                        <input type="text" className="form-input" placeholder="Expected Answer" id="expectedAnswer"/>

                        <select className="form-select" id="iteration">
                            <option value="DAILY">DAILY</option>
                            <option value="WEEKLY">WEEKLY</option>
                            <option value="MONTHLY">MONTHLY</option>
                        </select>
                        <button className="btn btn-primary custom-button" onClick={handleSave}>Save</button>
                </div>
                <div style={{marginTop: '30px'}}>
                    {posts.map(item => (
                        <div key={item.id} className={styles.dataItem}>
                            <input
                                type="text"
                                value={item.prompt}
                                onChange={(e) => handleChange(item.id, 'prompt', e.target.value)}
                            />
                            <input
                                type="text"
                                value={item.expectedAnswer}
                                onChange={(e) => handleChange(item.id, 'expectedAnswer', e.target.value)}
                            />
                            <select
                                value={item.iteration}
                                onChange={(e) => handleChange(item.id, 'iteration', e.target.value)}
                            >
                                <option value="DAILY">DAILY</option>
                                <option value="WEEKLY">WEEKLY</option>
                                <option value="MONTHLY">MONTHLY</option>
                            </select>
                            <button onClick={() => handleUpdateRegularPrompt(item)}
                                    className="btn btn-primary custom-button">Update
                            </button>
                            <button onClick={() => handleDelete(item.externalRegularPromptId)}
                                    className="btn btn-primary custom-button">Delete
                            </button>
                        </div>
                    ))}
                </div>
                {isModalOpen && <Modal changeLanguage={changeLanguage}/>}
            </div>
        </main>
    );
}

export default Setting;
