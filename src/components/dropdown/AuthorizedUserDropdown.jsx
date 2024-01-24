import {Link} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import {jwtDecode} from "jwt-decode";

function AuthorizedUserDropdown() {

    const [email, setEmail] = useState('');


    useEffect(() => {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token)
        localStorage.setItem('email', decodedToken.email);

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setEmail(decodedToken.email);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    },[]);

    const handleLogout = () => {
        saveChat();
        localStorage.removeItem('useCase');
        localStorage.removeItem('responseData');
        localStorage.removeItem('token');
        localStorage.removeItem('chat')
        window.location.href = '/';
    };

     function saveChat() {
        const chatList = localStorage.getItem('chat');
        const tokenObject = localStorage.getItem('token');
        const {value} = JSON.parse(tokenObject);
        console.log(JSON.stringify({
            chatMessageList: JSON.parse(chatList)
        }))
        try {
             fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/chat', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${value}`,
                },
                body: JSON.stringify({
                    chatMessageList: JSON.parse(chatList)
                })
            });

        } catch (error) {
            console.error('Ошибка при отправке сообщения:', error);
        }
        localStorage.removeItem('chat')
    };

    return (
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" height="50px" width="50px" viewBox="0 0 50 50">
                    <circle cx="25" cy="25" fill="none" r="24" stroke="#ffffff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" />
                    <rect fill="none" height="50" width="50" />
                    <path fill="#ffffff" d="M29.933,35.528c-0.146-1.612-0.09-2.737-0.09-4.21c0.73-0.383,2.038-2.825,2.259-4.888c0.574-0.047,1.479-0.607,1.744-2.818  c0.143-1.187-0.425-1.855-0.771-2.065c0.934-2.809,2.874-11.499-3.588-12.397c-0.665-1.168-2.368-1.759-4.581-1.759  c-8.854,0.163-9.922,6.686-7.981,14.156c-0.345,0.21-0.913,0.878-0.771,2.065c0.266,2.211,1.17,2.771,1.744,2.818  c0.22,2.062,1.58,4.505,2.312,4.888c0,1.473,0.055,2.598-0.091,4.21c-1.261,3.39-7.737,3.655-11.473,6.924  c3.906,3.933,10.236,6.746,16.916,6.746s14.532-5.274,15.839-6.713C37.688,39.186,31.197,38.93,29.933,35.528z" />
                </svg>
            </button>
            <ul className="dropdown-menu">
                {email && <li className="dropdown-item disabled">Logged in as: {email}</li>}
                <Link to="/history" className="dropdown-item">History</Link>
                <Link to="/billing" className="dropdown-item">Billing</Link>
                <Link to="/security" className="dropdown-item">Security</Link>
                <Link to="/setting" className="dropdown-item">Setting</Link>
                <Link to="/aitrism" className="dropdown-item">Ai Trism</Link>
                <button className="dropdown-item" onClick={handleLogout}>Log out</button>
                <a className="dropdown-item" href="#">Delete account</a>
            </ul>
        </div>
    );
}

export default AuthorizedUserDropdown;
