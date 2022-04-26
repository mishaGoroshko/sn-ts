import React, {ChangeEvent, KeyboardEvent} from 'react';

type StatusType = {
    status: string
}

export class ProfileStatus extends React.Component<StatusType> {

    state = {
        editMode: false,
        title: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
    }

    onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            title: e.currentTarget.value
        })
    }

    onKeyPressInput = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' &&
        this.setState({
            editMode: false
        })
    }

    render() {
        let {
            activateEditMode, deactivateEditMode,
            onChangeInputHandler, onKeyPressInput
        } = this
        let {title, editMode} = this.state
        return (
            <div>
                {editMode
                    ? <input value={title}
                             onChange={onChangeInputHandler}
                             onKeyPress={onKeyPressInput}
                             onBlur={deactivateEditMode}
                             autoFocus/>
                    : <h4 onDoubleClick={activateEditMode}>
                        MY STATUS: {title}</h4>}
            </div>
        );
    }
}