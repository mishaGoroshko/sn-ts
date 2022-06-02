import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {Route, Routes} from 'react-router-dom';
import News from './Components/News/News';
import Music from './Components/Music/Music';
import Settings from './Components/Settings/Settings';
import {DialogsConnect} from './Components/Dialogs/DialogsContainer';
import {FriendsContainer} from './Components/Friends/FriendsContainer';
import {UsersConnect} from './Components/Users/UsersContainer';
import ProfileConnect from './Components/Profile/ProfileContaineer';
import {HeaderConnect} from './Components/Header/HeaderContainer';
import {LoginConnect} from './Components/Login/Login';
import {connect} from 'react-redux';
import {AppStateType} from './Redux/redux-store';
import {Preloader} from './Components/common/Preloader/Preloader';
import {initializedApp} from './Redux/app-reducer';




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
                    <Routes>
                        <Route path="/profile/*" element={<ProfileConnect/>}/>
                        <Route path="/dialogs/*" element={<DialogsConnect/>}/>
                        <Route path="/news/*" element={<News/>}/>
                        <Route path="/music/*" element={<Music/>}/>
                        <Route path="/users/*" element={<UsersConnect/>}/>
                        <Route path="/settings/*" element={<Settings/>}/>
                        <Route path="/friends/*" element={<FriendsContainer/>}/>
                        <Route path="/login/*" element={<LoginConnect/>}/>
                    </Routes>
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
