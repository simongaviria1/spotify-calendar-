import React from 'react'

const Modal = ({hideModal, displayModal, childrenInfo, deleteEvent}) => {
    const showHideClassName = displayModal
        ? "modal display-block"
        : "modal display-none";
    console.log('showHideClassName', showHideClassName)

    return (
        <div className={this.showHideClassname}>
            <section className="modal-main ">
                <p>Details: {childrenInfo.description}</p>
                <p>Start Time: {childrenInfo.start_time}</p>
                <p>End Time: {childrenInfo.end_time}</p>
                <button onClick={hideModal}>close</button>{' '}
                <button onClick={deleteEvent}>Delete Event</button>
            </section>
        </div>
    );
};

export default Modal;