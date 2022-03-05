import React, {ChangeEvent, LegacyRef, RefObject} from 'react';
import s from './MyPost.module.css';
import Post from "./Post/Post";
// import {PostType} from "../../../index";
import {postType, ProfilePageType} from "../../../Redux/state";


type MyPostType = {
    profilePage: ProfilePageType
    addPost: (postText: string) => void
    onchangeTextarea: (newText: string) => void
}

const MyPost: React.FC<MyPostType> = (props) => {

    let postsElement = props.profilePage.posts.map(post => <Post key={post.id} {...post}/>)

    // let newPostElement = React.createRef<HTMLTextAreaElement>()
    // let addPost = () => {
    //     if (newPostElement.current) {
    //         props.addPost(newPostElement.current.value)
    //     }
    // }

    let addPost = () => {
        props.addPost(props.profilePage.messageForNewPost)
    }

    const onchangeTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.onchangeTextarea(e.currentTarget.value)
    }


    return (
        <div className={s.postBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onchangeTextareaHandler} value={props.profilePage.messageForNewPost}></textarea>
                    {/*<textarea ref={newPostElement} value={props.profilePage.messageForNewPost}></textarea>*/}
                </div>
                <div>
                    <button onClick={addPost}>add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    );
};

export default MyPost;