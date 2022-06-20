import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Textarea} from '../common/FormControls/FormControls';
import {maxLength, required} from '../../helpers/validation/validator';
import {connect} from 'react-redux';
import {loginAuthTC} from '../../Redux/auth-reducer';
import {AppStateType} from '../../Redux/redux-store';
import {Navigate} from 'react-router-dom';
import s from '../common/FormControls/FormControls.module.css'

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormType = {
    captchaUrl: string | null,
}

const maxLength5 = maxLength(30)


export const LoginForm: React.FC<LoginFormType & InjectedFormProps<FormDataType, LoginFormType>> =
    ({handleSubmit, error, captchaUrl}) => {
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <Field name="email"
                           placeholder="email"
                           type={'input'}
                           component={Textarea}
                           validate={[required, maxLength5]}/>
                </div>
                <div>
                    <Field name="password"
                           placeholder="password"
                           type={'password'}
                           component={Textarea}
                           validate={[required, maxLength5]}/>
                </div>
                <div>
                    <Field name="rememberMe"
                           component="input"
                           type={'checkbox'}/>remember me
                </div>
                {captchaUrl && <div>
                    <img src={captchaUrl} alt=""/>
                    <Field name="captcha"
                           placeholder="captcha"
                           type={'text'}
                           component={Textarea}
                           validate={[required, maxLength5]}/>
                </div>}

                {error && <div className={s.errorMessage}>{error}</div>}
                <div>
                    <button>login</button>
                </div>
            </form>
        );
    }


export const LoginReduxForm = reduxForm<FormDataType, LoginFormType>({form: 'login'})(LoginForm)


const Login: React.FC<LoginType> = ({isAuth, loginAuthTC, captchaUrl}) => {

    const onSubmit = (formData: FormDataType) => {
        let {email, password, rememberMe, captcha} = formData
        loginAuthTC(email, password, rememberMe, captcha)
    }
    return (
        isAuth
            ? <Navigate to="/profile" replace/>
            : <>
                <h1>LOGIN PLEASE</h1>
                <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
            </>
    )
}

type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null,
}

type MapDispatchPropsType = {
    loginAuthTC: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type LoginType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType =>
    ({
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl,
    })

export default connect(mapStateToProps, {loginAuthTC})(Login)
