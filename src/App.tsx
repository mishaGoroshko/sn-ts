import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Navbar from './Components/Navbar/Navbar';
import Profile from './Components/Profile/Profile';
import {Route, Routes} from 'react-router-dom';
import News from './Components/News/News';
import Music from './Components/Music/Music';
import Settings from './Components/Settings/Settings';
import {DialogsContainer} from './Components/Dialogs/DialogsContainer';
import {FriendsContainer} from './Components/Friends/FriendsContainer';
import {UsersConnect} from './Components/Users/UsersContainer';

type AppType = {}

const App: React.FC<AppType> = ({...props}) => {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar/>
            <div className={'app-wrapper-content'}>
                <Routes>
                    <Route path="/profile/*" element={<Profile/>}/>
                    <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                    <Route path="/news/*" element={<News/>}/>
                    <Route path="/music/*" element={<Music/>}/>
                    <Route path="/users/*" element={<UsersConnect/>}/>
                    <Route path="/settings/*" element={<Settings/>}/>
                    <Route path="/friends/*" element={<FriendsContainer/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
