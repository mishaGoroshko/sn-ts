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
import {StoreType} from "./Redux/state";

type AppType = {
    store: StoreType
}

const App: React.FC<AppType> = ({store, ...props}) => {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar friends={store._state.sidebar.friends}/>
            <div className={'app-wrapper-content'}>
                <Routes>
                    <Route path="/profile/*" element={<Profile profilePage={store._state.profilePage}
                                                               dispatch={store.dispatch.bind(store)}
                                                               // addPost={store.addPost.bind(store)}
                                                               // onchangeTextarea={store.onchangeTextarea.bind(store)}
                    />}/>
                    <Route path="/dialogs/*" element={<Dialogs dialogsData={store._state.dialogsPage.dialogs}
                                                               messagesData={store._state.dialogsPage.messages}/>}/>
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
