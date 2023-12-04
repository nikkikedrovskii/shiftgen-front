import React, {useEffect, useState} from 'react';
import qinshiftLogo from '../../img/qinshift_logo.svg';
import {Link} from "react-router-dom";
import "./Security.css"
import ForbiddenWordForm from "../../components/forbidden_word_form/ForbiddenWordForm";
import ForbiddenWordList from "../../components/forbidden_word/ForbiddenWordList";

function Security() {


    const [posts, setPosts] = useState([])

    useEffect(()=>{
        console.log(posts)
        fetchBannedWordResponseList();
    },[])

    async function fetchBannedWordResponseList() {
        const tokenObject = localStorage.getItem('token');
        const {value} = JSON.parse(tokenObject);
        const response = await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/banned',{
            headers: {
                Authorization: `Bearer ${value}`
            }
        });
        const data = await response.json();
        console.log(data)
        setPosts(data.bannedWordResponseList);
    }

    async function createPost(newPost) {
        const tokenObject = localStorage.getItem('token');
        const {value} = JSON.parse(tokenObject);
         await fetch('https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/banned',{
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${value}`,
            },
            method: 'POST',
             body: JSON.stringify({
                 word: newPost.word
             }),
        });
        setPosts([...posts, newPost]);
    }

    async function removePost(post) {
        const tokenObject = localStorage.getItem('token');
        const {value} = JSON.parse(tokenObject);
        console.log(post.id)
        await fetch(`https://qingentest.jollyflower-775741df.northeurope.azurecontainerapps.io/banned/${post.id}`, {
            headers: {
                Authorization: `Bearer ${value}`
            },
            method: 'DELETE', // Определение метода запроса
        });
        setPosts(posts.filter(p => p.id !== post.id));
    }

    return (
        <main>
            <div className="container">
                <div className="d-flex align-items-center">
                    <div className="go-back-link">
                        <p className="mb-0"><Link to="/authorization">Back</Link></p>
                    </div>
                    <img src={qinshiftLogo} alt="logo Qinshift" className="ms-auto brand-logo"/>
                </div>
                <ForbiddenWordForm create={createPost}/>
                {posts.length !== 0
                    ? <ForbiddenWordList remove={removePost} posts={posts} title={"Banned words:"}/>
                    : <div>Banned word not found.</div>
                }
            </div>
        </main>
    );
}

export default Security;
