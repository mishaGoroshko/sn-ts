import React from 'react';
import {Friends} from './Friends';
import {connect} from 'react-redux';
import {InitialStateSidebarType} from '../../Redux/sidebar-reducer';
import {Dispatch} from 'redux';
import {AppStateType} from '../../Redux/redux-store';

type MapStatePropsType = {
    sidebar: InitialStateSidebarType
}
type MapDispatchPropsType = {}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        sidebar: state.sidebar
    }
}

export type FriendsType = MapStatePropsType & MapDispatchPropsType

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {}
}

export const FriendsContainer = connect(mapStateToProps, mapDispatchToProps)(Friends)