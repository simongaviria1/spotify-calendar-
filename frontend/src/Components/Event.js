import React, {Component} from 'react'
import Style from '.././CSS/style.css'

//Component takes in events object and iterates through array of objects to display event details 

class Event extends Component {
    render() {
        const {events, day} = this.props
        console.log('events', events)
        return (
            <div>{events
                    ? <div>{events.map(ele => {
                                return (
                                    <div className='event-details'>
                                        <p>{ele.description}</p>
                                        <p>{ele.start_time}</p>
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