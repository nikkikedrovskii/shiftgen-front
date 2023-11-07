import React, {useEffect, useState} from 'react';
import qinshiftLogo from '../../img/qinshift_logo.svg';
import {Link} from "react-router-dom";
import "./Security.css"
import ForbiddenWordForm from "../../components/forbidden_word_form/ForbiddenWordForm";
import ForbiddenWordList from "../../components/forbidden_word/ForbiddenWordList";

function Security() {

    const token = localStorage.getItem('token');

    const [posts, setPosts] = useState([])

    useEffect(()=>{
        console.log(posts)
        fetchBannedWordResponseList();
    },[])

    async function fetchBannedWordResponseList() {
        const response = await fetch('http://shiftgen-env.eba-cigf3qkz.eu-north-1.elasticbeanstalk.com/banned',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log(data)
        setPosts(data.bannedWordResponseList);
    }

    async function createPost(newPost) {
         await fetch('http://shiftgen-env.eba-cigf3qkz.eu-north-1.elasticbeanstalk.com/banned',{
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            method: 'POST',
             body: JSON.stringify({
                 word: newPost.word
             }),
        });
        setPosts([...posts, newPost]);
    }

    async function removePost(post) {
        console.log(post.id)
        await fetch(`http://shiftgen-env.eba-cigf3qkz.eu-north-1.elasticbeanstalk.com/banned/${post.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
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
