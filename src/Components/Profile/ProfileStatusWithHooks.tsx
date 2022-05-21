import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type StatusType = {
    status: string
    updateStatusTC: (status: string) => void
}

export const ProfileStatusWithHooks: React.FC<StatusType> = ({
                                                                 status,
                                                                 updateStatusTC
                                                             }) => {


    let [editMode, setEditMode] = useState(false)
    let [localStatus, setLocalStatus] = useState(status)


    const activateEditMode = () => setEditMode(true)

    const deactivateEditMode = () => {
        setEditMode(false)
        updateStatusTC(localStatus)
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalStatus(e.currentTarget.value)
    }

    const onKeyPressInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setEditMode(false)
            updateStatusTC(localStatus)
        }
    }

    return (
        <div>
            {editMode
                ? <input value={localStatus}
                         onChange={onChangeInputHandler}
                         onKeyPress={onKeyPressInput}
                         onBlur={deactivateEditMode}
                         autoFocus/>
                : <h4 onDoubleClick={activateEditMode}>
                    MY STATUS: {status || '------'}</h4>}
        </div>
    );

}