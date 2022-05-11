import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Textarea} from '../common/FormControls/FormControls';
import {maxLength, required} from '../../utils/validators/validator';
import {connect} from 'react-redux';
import {loginAuthTC} from '../../Redux/auth-reducer';
import {AppStateType} from '../../Redux/redux-store';
import {Navigate} from 'react-router-dom';
import s from '../common/FormControls/FormControls.module.css'

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const maxLength5 = maxLength(30)


export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({
                                                                         handleSubmit,
                                                                         error
                                                                     }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name="email" placeholder="email" type={'input'}
                       component={Textarea}
                       validate={[required, maxLength5]}/>
            </div>
            <div>
                <Field name="password" placeholder="password" type={'password'}
                       component={Textarea}
                       validate={[required, maxLength5]}/>
            </div>
            <div>
                <Field name="rememberMe" component="input" type={'checkbox'}/>remember me
            </div>

            {error && <div className={s.errorMessage}>{error}</div>}

            <div>
                <button>login</button>
            </div>
        </form>
    );
}


export const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)


export const Login: React.FC<LoginType> = ({isAuth, loginAuthTC}) => {
    // const dispatch = useDispatch()
    // const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)

    const onSubmit = (formData: FormDataType) => {
        let {email, password, rememberMe} = formData
        loginAuthTC(email, password, rememberMe)
    }

    return (
        isAuth
            ? <Navigate to="/profile" replace/>
            : <>
                <h1>LOGIN PLEASE</h1>
                <LoginReduxForm onSubmit={onSubmit}/>
            </>
    )
}

type MapStatePropsType = {
    isAuth: boolean
}

type MapDispatchPropsType = {
    loginAuthTC: (email: string, password: string, rememberMe: boolean) => void
}

type LoginType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType =>
    ({isAuth: state.auth.isAuth})

export const LoginConnect = connect(mapStateToProps, {loginAuthTC})(Login)
