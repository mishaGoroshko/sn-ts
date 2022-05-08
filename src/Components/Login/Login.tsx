import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Textarea} from '../common/FormControls/FormControls';
import {maxLength, required} from '../../utils/validators/validator';

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const maxLength5 = maxLength(3)


export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder="login" name="login" type={'input'} component={Textarea} validate={[required, maxLength5]}/>
            </div>
            <div>
                <Field placeholder="password" name="password" type={'input'} component={Textarea} validate={[required, maxLength5]}/>
            </div>
            <div>
                <Field component="input" name="rememberMe" type={'checkbox'}/>remember me
            </div>
            <div>
                <button>login</button>
            </div>

        </form>
    );
}


export const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)


export const Login = () => {

    const onSubmit = (formData: FormDataType) => {
        console.log(formData)
    }

    return (
        <>
            <h1>LOGIN PLEASE</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </>
    );
}
