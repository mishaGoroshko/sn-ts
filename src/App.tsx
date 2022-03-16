import React from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Navbar from "./Components/Navbar/Navbar";
import Profile from "./Components/Profile/Profile";
import Dialogs from "./Components/Dialogs/Dialogs";
import {Route, Routes} from "react-router-dom";
import News from "./Components/News/News";
import Music from "./Components/Music/Music";
import Settings from "./Components/Settings/Settings";
import {Friends} from "./Components/Friends/Friends";
import {ActionsTypes, RootStateType} from "./Redux/store";

type AppType = {
    state: RootStateType
    dispatch: (action: ActionsTypes) => void
}

const App: React.FC<AppType> = ({state, dispatch, ...props}) => {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar friends={state.sidebar.friends}/>
            <div className={'app-wrapper-content'}>
                <Routes>
                    <Route path="/profile/*" element={<Profile profilePage={state.profilePage}
                                                               dispatch={dispatch}/>}/>
                    <Route path="/dialogs/*" element={<Dialogs dialogsPage={state.dialogsPage}
                                                               dispatch={dispatch}/>}/>
                    <Route path="/news/*" element={<News/>}/>
                    <Route path="/music/*" element={<Music/>}/>
                    <Route path="/settings/*" element={<Settings/>}/>
                    <Route path="/friends/*" element={<Friends friends={state.sidebar.friends}/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
