import React from 'react'

const Modal = ({hideModal, displayModal, children}) => {
    const showHideClassName = displayModal
        ? "modal display-block"
        : "modal display-none";

    return (
        <div className={this.showHideClassname}>
            <section className="modal-main">
                {children}
                <button onClick={hideModal}>close</button>
            </section>
        </div>
    );
};

export default Modal;