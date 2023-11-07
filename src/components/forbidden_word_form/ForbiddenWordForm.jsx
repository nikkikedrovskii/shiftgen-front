import React, {useState, useEffect} from 'react';
import Input from "../input/Input";
import WordButton from "../button/WordButton";

const ForbiddenWordForm = ({create}) => {

    const [post,setPost] = useState({word: ''});
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({word: ''})
    }

    useEffect(() => {

        if (post.word.length > 30) {
            setIsButtonDisabled(true);
        } else {
            setIsButtonDisabled(false);
        }
    }, [post.word]);

    return (
        <div>
            <form>
                <Input value={post.word} onChange={e => setPost({...post, word: e.target.value})} type="text" placeholder="Banned word"/>
                {post.word.length > 30 && <div style={{color:"red",fontSize:"0.75em"}}>Word length must be &lt;= 30</div>}
                <WordButton onClick={addNewPost}  disabled={isButtonDisabled}>Add</WordButton>

            </form>
        </div>
    );
};

export default ForbiddenWordForm;
