import React from 'react';
import ButtonWithProgress from './ButtonWithProgress';

const Modal = (props) => {
    const { visible, onClickCancel, message, onClickOk, pendingApiCall, title, okButton } = props;

    let className = 'modal fade';
    if(visible) {
        className += 'show d-block';
    }
    return (
        <div className = {className} style = {{backgroundColor: '#000000b0'}}>
            <div className = "modal-dialog">
                <div className = "modal-content">
                    <div className = "modal-header">
                        <h5 className = "modal-title">{title}</h5>                        
                    </div>
                    <div className = "modal-body">
                        {message}
                    </div>
                    <div className = "modal-footer">
                        <button type="button" className = "btn btn-secondary" onClick = {onClickCancel} disabled = {pendingApiCall}>Cancel</button>
                        <ButtonWithProgress className = "btn btn-danger" onClick = {onClickOk} pendingApiCall = {pendingApiCall} text = {okButton} disabled = {pendingApiCall}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;