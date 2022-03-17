import React from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Navbar from "./Components/Navbar/Navbar";
import Profile from "./Components/Profile/Profile";
import {Route, Routes} from "react-router-dom";
import News from "./Components/News/News";
import Music from "./Components/Music/Music";
import Settings from "./Components/Settings/Settings";
import {DialogsContainer} from "./Components/Dialogs/DialogsContainer";
import {FriendsContainer} from "./Components/Friends/FriendsContainer";

type AppType = {
    store: any
}

const App: React.FC<AppType> = ({store, ...props}) => {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar friends={store.getState().sidebar.friends}/>
            <div className={'app-wrapper-content'}>
                <Routes>
                    <Route path="/profile/*" element={<Profile store={store}/>}/>
                    <Route path="/dialogs/*" element={<DialogsContainer store={store}/>}/>
                    <Route path="/news/*" element={<News/>}/>
                    <Route path="/music/*" element={<Music/>}/>
                    <Route path="/settings/*" element={<Settings/>}/>
                    <Route path="/friends/*" element={<FriendsContainer store={store}/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
