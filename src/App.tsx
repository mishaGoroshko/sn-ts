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
import {RootStateType} from "./Redux/state";

type AppType = {
    state: RootStateType
    addPost:(postText: string)=>void
    onchangeTextarea: (newText: string) => void
}

const App: React.FC<AppType> = ({state,addPost,onchangeTextarea,...props}) => {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar friends={state.sidebar.friends}/>
            <div className={'app-wrapper-content'}>
                <Routes>
                    <Route path="/profile/*" element={<Profile profilePage={state.profilePage}
                                                                addPost={addPost} onchangeTextarea={onchangeTextarea}/>}/>
                    <Route path="/dialogs/*" element={<Dialogs dialogsData={state.dialogsPage.dialogs}
                                                               messagesData={state.dialogsPage.messages}/>}/>
                    <Route path="/news/*" element={<News/>}/>
                    <Route path="/music/*" element={<Music/>}/>
                    <Route path="/settings/*" element={<Settings/>}/>
                    {/*<Route path="/friends/*" element={<Friends friends={state.sidebar.friends}/>}/>*/}
                </Routes>
            </div>
        </div>
    );
}

export default App;
