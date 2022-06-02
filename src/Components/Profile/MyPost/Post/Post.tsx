import React from 'react';
import s from './Post.module.css';

type PostType = {
    message: string
    likeCounting: number
}

const Post: React.FC<PostType> = (props) => {
    console.log('POST')
    return (
        <div className={s.item}>
            <img src="https://avatanplus.com/files/resources/mid/57ac619b01a15156795d457f.png" alt=""/>
            <span className={s.item}>{props.message}</span>
            <div>
                <button>like {props.likeCounting} </button>
            </div>
        </div>
    );
};

export default Post;