import React, {ChangeEvent} from 'react';
import s from './MyPost.module.css';
import Post from "./Post/Post";
import {MyPostType} from './MyPostContainer';


const MyPost: React.FC<MyPostType> = ({addPost, onchangeTextarea, profilePage, ...props}) => {

    let postsElement = profilePage.posts.map(post => <Post key={post.id} {...post}/>)

    // let newPostElement = React.createRef<HTMLTextAreaElement>()
    // let addPost = () => {if (newPostElement.current) {props.addPost(newPostElement.current.value)}}

    let addPostHandler = () => {
        addPost()
    }

    const onchangeTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onchangeTextarea(e.currentTarget.value)
    }

    return (
        <div className={s.postBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onchangeTextareaHandler} value={profilePage.messageForNewPost}/>
                    {/*<textarea ref={newPostElement} value={props.profilePage.messageForNewPost}></textarea>*/}
                </div>
                <div>
                    <button onClick={addPostHandler}>add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    );
};

export default MyPost;