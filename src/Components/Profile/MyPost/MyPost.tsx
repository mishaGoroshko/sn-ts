import React, {ChangeEvent} from 'react';
import s from './MyPost.module.css';
import Post from './Post/Post';
import {MyPostType} from './MyPostContainer';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';

type FormDataType = {
    newPost: string
}

export const MyPost: React.FC<MyPostType> = ({
                                                 addPost,
                                                 profilePage,
                                                 ...props
                                             }) => {

    let postsElement = profilePage.posts.map(post => <Post key={post.id} {...post}/>)
    // let newPostElement = React.createRef<HTMLTextAreaElement>()
    // let addPost = () => {if (newPostElement.current) {props.addPost(newPostElement.current.value)}}

    let addPostHandler = (formData: FormDataType) => {
        addPost(formData.newPost)
    }

    return (
        <div className={s.postBlock}>
            <h3>My posts</h3>
            <div>
                <MyPostReduxForm onSubmit={addPostHandler}/>

            </div>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    );
}


export const MyPostForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field component={'textarea'}
                       name={'newPost'}
                       placeholder={'enter your post'}/>
            </div>
            <div>
                <button>add post</button>
            </div>
        </form>
    );
}

export const MyPostReduxForm = reduxForm<FormDataType>({form: 'profileAddNewPost'})(MyPostForm)