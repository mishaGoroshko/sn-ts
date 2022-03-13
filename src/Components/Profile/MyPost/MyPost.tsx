import React, {ChangeEvent} from 'react';
import s from './MyPost.module.css';
import Post from "./Post/Post";
import {addPostAC, onchangeTextareaHandlerAC} from "../../../Redux/proofile-reducer";
import {ActionsTypes, ProfilePageType} from "../../../Redux/state";


type MyPostType = {
    profilePage: ProfilePageType
    dispatch: (action: ActionsTypes) => void
}

const MyPost: React.FC<MyPostType> = (props) => {

    let postsElement = props.profilePage.posts.map(post => <Post key={post.id} {...post}/>)

    // let newPostElement = React.createRef<HTMLTextAreaElement>()
    // let addPost = () => {if (newPostElement.current) {props.addPost(newPostElement.current.value)}}

    let addPost = () => {
        // props.dispatch({type: "ADD-POST", postText: props.profilePage.messageForNewPost})
        props.dispatch(addPostAC(props.profilePage.messageForNewPost))

    }

    const onchangeTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        // props.dispatch({type: "ONCHANGE-TEXT-AREA", newText: e.currentTarget.value})
        props.dispatch(onchangeTextareaHandlerAC(e.currentTarget.value))
    }


    return (
        <div className={s.postBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onchangeTextareaHandler} value={props.profilePage.messageForNewPost}/>
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