import React from 'react';
import s from './DialogItem.module.css'
import {NavLink} from 'react-router-dom';
import {dialogType} from '../../../../Redux/dialogs-reducer';

type DialogItemType = dialogType

const DialogItem: React.FC<DialogItemType> = (props) => {

    const dialogBlock = (click: { isActive: boolean; }) => click.isActive ? `${s.dialogActive} ${s.dialogBlock}` : `${s.dialogPassive} ${s.dialogBlock}`

    return <>
        <NavLink to={'/Dialogs/' + props.id}
                 className={dialogBlock}>
            <img className={s.image} src={props.image} alt=""/>
            <span className={s.name}>{props.name}</span>
        </NavLink>
    </>
};

export default DialogItem;
