import React from 'react';
import s from './MyPost.module.css';
import Post from './Post/Post';
import {MyPostType} from './MyPostContainer';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {maxLength, required} from '../../../helpers/validation/validator';
import {Textarea} from '../../common/FormControls/FormControls';

type FormDataType = {
    newPost: string
}

export const MyPost = React.memo<MyPostType>(({addPost, profilePage, ...props}) => {

    let postsElement = [...profilePage.posts]
        .reverse()
        .map(post => <Post key={post.id} {...post}/>)

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
})

const maxLength5 = maxLength(3)

export const MyPostForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field component={Textarea}
                       name={'newPost'}
                       placeholder={'enter your post'}
                       validate={[required, maxLength5]}/>
            </div>
            <div>
                <button>add post</button>
            </div>
        </form>
    );
}

export const MyPostReduxForm = reduxForm<FormDataType>({form: 'profileAddNewPost'})(MyPostForm)