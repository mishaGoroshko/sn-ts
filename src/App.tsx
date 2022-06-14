import React, {lazy, Suspense} from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {Route, Routes} from 'react-router-dom';
// import News from './Components/News/News';
// import Music from './Components/Music/Music';
// import Settings from './Components/Settings/Settings';
// import Dialogs from './Components/Dialogs/DialogsContainer';
// import Friends from './Components/Friends/FriendsContainer';
// import UsersContainer from './Components/Users/UsersContainer';
import ProfileConnect from './Components/Profile/ProfileContaineer';
import {HeaderConnect} from './Components/Header/HeaderContainer';
// import Login from './Components/Login/Login';
import {connect} from 'react-redux';
import {AppStateType} from './Redux/redux-store';
import {Preloader} from './Components/common/Preloader/Preloader';
import {initializedApp} from './Redux/app-reducer';

const Dialogs = lazy(() => import("./Components/Dialogs/DialogsContainer"));
const UsersContainer = lazy(() => import("./Components/Users/UsersContainer"));
const News = lazy(() => import("./Components/News/News"));
const Music = lazy(() => import("./Components/Music/Music"));
const Settings = lazy(() => import("./Components/Settings/Settings"));
const Friends = lazy(() => import("./Components/Friends/FriendsContainer"));
const Login = lazy(() => import("./Components/Login/Login"));


class App extends React.Component<AppType> {
    componentDidMount() {
        this.props.initializedApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader isFetching/>
        }
        return (
            <div className="app-wrapper">
                <HeaderConnect/>
                <Navbar/>
                <div className={'app-wrapper-content'}>
                    <Suspense fallback={<Preloader isFetching={true} />}>
                        <Routes>
                            <Route path="/profile/*" element={<ProfileConnect/>}/>
                            <Route path="/dialogs/*" element={<Dialogs/>}/>
                            <Route path="/users/*" element={<UsersContainer/>}/>
                            <Route path="/news/*" element={<News/>}/>
                            <Route path="/music/*" element={<Music/>}/>
                            <Route path="/settings/*" element={<Settings/>}/>
                            <Route path="/friends/*" element={<Friends/>}/>
                            <Route path="/login/*" element={<Login/>}/>
                        </Routes>
                    </Suspense>
                </div>
            </div>
        );
    }
}

type MpaStatePropsType = {
    initialized: boolean
}
type MpaDispatchPropsType = {
    initializedApp: () => void
}
export type AppType = MpaStatePropsType & MpaDispatchPropsType

const mapStateToProps = (state: AppStateType): MpaStatePropsType => {
    return {
        initialized: state.app.initialized
    }
}


export default connect(mapStateToProps, {initializedApp})(App)
