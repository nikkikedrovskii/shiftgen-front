import React, {useEffect, useState} from 'react';
import qinshiftLogo from '../../../img/qinshift_logo.svg'
import {useNavigate} from "react-router-dom";
import {AiOutlineLeft} from "react-icons/ai";

function ImageHistoryPage({ switchToFile }) {
    const [fileList, setFileList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const tokenObject = localStorage.getItem('token');
        if (!tokenObject) return;
        const { value } = JSON.parse(tokenObject);
        async function fetchImageData() {
            const response = await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/user/image', {
                headers: {
                    Authorization: `Bearer ${value}`
                }
            });

            const data = await response.json();
            console.log(data);
            setFileList(data.userImageResponseList);
        }

        fetchImageData();
    }, []);

    const handleDownload = async (imageName) => {
        const tokenObject = localStorage.getItem('token');
        if (!tokenObject) return;
        const { value } = JSON.parse(tokenObject);
        try {
            const response =  await fetch(`https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/user/azure/${encodeURIComponent(imageName)}/image`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${value}`,
                },
            })
            const { imageUrl }  = await response.json();
            console.log(imageUrl)

            const link = document.createElement('a');
            link.href = imageUrl;
            link.setAttribute('download', '');
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
        } catch (error) {
            console.error('Ошибка при скачивании картинки:', error);
        }
    };

    return (
        <main>
            <div className="container">
                <div className="d-flex align-items-center">
                    <div className="go-back-link" onClick={() => navigate(-1)}>
                        <p className="mb-0">
                            <AiOutlineLeft className={'icon-ba'}/>
                            Back
                        </p>
                    </div>
                    <img src={qinshiftLogo} alt="logo Qinshift" className="ms-auto brand-logo"/>
                </div>
                <div className="text-center">
                <h4>Image History</h4>
                <button className="btn btn-primary mb-5 mt-2 custom-button" onClick={switchToFile}>Go to File History</button>
                </div>
                <div className="table-responsive">
                    <table className="table table-sm">
                        <thead>
                        <tr>
                            <th>Image name</th>
                            <th>Prompt</th>
                            <th>Image</th>
                            <th>Image quality</th>
                            <th>Image resolution</th>
                        </tr>
                        </thead>
                        <tbody>
                        {fileList.map((image, index) => (
                            <tr key={index}>
                                <th>{image.imageName}</th>
                                <th>{image.prompt}</th>
                                <th onClick={() => handleDownload(image.imageName)}>
                                        <img src={image.imagePath} alt={image.imageName}
                                             style={{width: '100px', height: '100px'}}/>
                                </th>
                                <th>{image.quality}</th>
                                <th>{image.resolution}</th>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}

export default ImageHistoryPage;
