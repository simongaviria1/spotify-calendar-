import React, {Component} from 'react'
import Style from '../CSS/style.css'
import Modal from './Modal'

import axios from 'axios'

// Component takes in events object and iterates through array of objects to
// display event details

class Event extends Component {

    //Render modal function
    renderModal = ele => {
        return (<Modal
            onClick={this.toggleClass}
            displayModal={this.props.displayModal}
            childrenInfo={ele}
            hideModal={this.props.hideModal}
            deleteEvent={this
            .props
            .deleteEvent(this.props.eventId)}/>)
    }

    render() {
        const {events, day, displayModal, toggleClass} = this.props
        console.log(displayModal)
        return (
            <div>{events
                    ? <div>{events.map(ele => {
                                return (
                                    <div className='event' onClick={toggleClass} key={ele.id}>
                                        {displayModal
                                            ? this.renderModal(ele)
                                            : ''}
                                        <p className='event-details'>{ele.description}</p>
                                    </div>
                                )
                            })}</div>
                    : ''
}
            </div>
        )
    }
}

export default Event;