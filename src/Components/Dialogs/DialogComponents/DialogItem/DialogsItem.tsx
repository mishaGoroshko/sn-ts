import React from 'react';
import s from './DialogItem.module.css'
import {NavLink} from "react-router-dom";
import {dialogType} from "../../../../Redux/store";

type DialogItemType = dialogType

const DialogItem: React.FC<DialogItemType> = (props) => {
    return (
        <div>
            <NavLink to={'/Dialogs/' + props.id} className={click => click.isActive ? s.dialogActive : s.dialogItem}>
                <img className={s.image} src={props.image} alt=""/>
                {props.name}
            </NavLink>
        </div>
    )
};

export default DialogItem;
