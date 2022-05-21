import React, {ChangeEvent, KeyboardEvent} from 'react';

type StatusType = {
    status: string
    updateStatusTC: (status: string) => void
}

export class ProfileStatus extends React.Component<StatusType> {

    state = {
        editMode: false,
        localStatus: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false,
        })
        this.props.updateStatusTC(this.state.localStatus)
    }

    onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            localStatus: e.currentTarget.value
        })
    }

    onKeyPressInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            this.setState({
                editMode: false
            })
            this.props.updateStatusTC(this.state.localStatus)
        }
    }

    componentDidUpdate(prevProps: Readonly<StatusType>, prevState: Readonly<{}>, snapshot?: any) {
        prevProps.status !== this.props.status &&
        this.setState({
            localStatus: this.props.status
        })
    }

    render() {
        let {
            activateEditMode, deactivateEditMode,
            onChangeInputHandler, onKeyPressInput
        } = this
        let {localStatus, editMode} = this.state
        return (
            <div>
                {editMode
                    ? <input value={localStatus}
                             onChange={onChangeInputHandler}
                             onKeyPress={onKeyPressInput}
                             onBlur={deactivateEditMode}
                             autoFocus/>
                    : <h4 onDoubleClick={activateEditMode}>
                        MY STATUS: {this.props.status || '------'}</h4>}
            </div>
        );
    }
}