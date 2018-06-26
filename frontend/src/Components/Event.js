import React, {Component} from 'react'
import Style from '.././CSS/style.css'

// Component takes in events object and iterates through array of objects to
// display event details

class Event extends Component {

    handleClick = () => {
        console.log('clicked')
    }

    render() {
        const {events, day} = this.props
        // console.log('events', events)
        return (
            <div>{events
                    ? <div>{events.map(ele => {
                                return (
                                    <div className='event-details' onClick={this.handleClick}>
                                        <p>{ele.description}</p>
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