import React, {Component} from 'react'

import dateFns from "date-fns";
import axios from 'axios'

// import Modal from './Modal'
import Form from './Form'
import Event from './Event'

class Calendar extends Component {
    constructor() {
        super();
        this.state = {
            currentMonth: new Date(),
            selectedDate: new Date(),
            events: [],
            eventId: null,
            message: '',
            displayModal: false
        }
    }

    // Gets all of the events before the component mounts -> it will render events
    // as well as the date as soon as the page rerenders
    componentWillMount = () => {
        const {selectedDate} = this.state
        var month = selectedDate.getMonth() + 1
        var day = selectedDate.getDate()
        var year = selectedDate.getFullYear()

        //Formats month from '6' => '06'
        if (month < 10) {
            month = '0' + month
        }
        //Formats day from '6' => '06'
        if (day < 10) {
            day = '0' + day
        }
        axios //Axios request to get all of the events when the page renders
            .get('/users/events', {
            params: {
                event_month: month,
                user_id: 1
            }
        })
            .then(res => {
                // console.log('res', res.data.user)
                this.setState({
                    events: res
                        .data
                        .user
                        .reduce((acc, item) => ({
                            ...acc,
                            [item.event_day]: res
                                .data
                                .user
                                .filter((i) => i.event_day === item.event_day)
                                // Takes incoming data [Object, Object] turns it into -> event_day:
                                // [{event_details_object}] and passes this as props to Event component
                        }), {})
                })
            })
    }

    deleteEvent = eventId => {
        axios
            .delete('/users/events', {id: eventId})
            .then(res => {
                console.log('event deleted')
            })
    }

    toggleClass = e => {
        this.setState({displayModal: true})
    }

    hideModal = () => {
        this.setState({displayModal: false})
    }

    hideForm = () => {
        this.setState({showForm: false})
    }

    setId = (id) => {
        this.setState({id: id})
    }

    onSubmit = (e) => {
        e.preventDefault()
        const {events, start, end, description, date} = this.state

        //Splits the date into month, day and year
        var dateArray = date.split('-')
        var day = dateArray[dateArray.length - 1]
        var month = dateArray[1]
        var year = dateArray[0]

        // console.log('onSubmit day', day)
        axios.post('/users/events', {
            description: description,
            start_time: start,
            end_time: end,
            event_month: month,
            event_day: day,
            event_year: year,
            user_id: 1 //Hardcoded the user's id number
        })

        let eventCopy = this.state.events
        events[day]
            ? events[day].push({
                description: description,
                start_time: start,
                end_time: end,
                event_month: month,
                event_day: day,
                event_year: year
            })
            : events[day] = [
                {
                    description: description,
                    start_time: start,
                    end_time: end,
                    event_month: month,
                    event_day: day,
                    event_year: year
                }
            ]

        // console.log('eventCopy', eventCopy)

        this.setState({
            // Need to fix this
            events: eventCopy,
            showForm: false,
            message: 'Event added'
        })
    }

    formatDate = () => {
        const {selectedDate} = this.state
        var month = selectedDate.getMonth() + 1
        var day = selectedDate.getDate()
        var year = selectedDate.getFullYear()

        if (month < 10) {
            month = '0' + month
        }
        if (day < 10) {
            day = '0' + day
        }
        this.setState({
            date: year + '-' + month + '-' + day
        })

    }

    handleDescriptionChange = e => {
        this.setState({description: e.target.value})
    }

    handleStartTimeChange = e => {
        this.setState({start: e.target.value})
    }

    handleEndTimeChange = e => {
        this.setState({end: e.target.value})
    }

    renderHeader = () => {
        const dateFormat = "MMMM YYYY";
        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    {this.renderModal}
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
                    <span>
                        {dateFns.format(this.state.currentMonth, dateFormat)}
                    </span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">chevron_right</div>

                </div>
            </div>
        );
    }

    //Renders date on calendar
    renderDays = () => {
        const dateFormat = "dddd";
        const days = [];
        let startDate = dateFns.startOfWeek(this.state.currentMonth);
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
                </div>
            );
        }
        return <div className="days row">{days}</div>;
    }

    renderCells = () => {
        const {currentMonth, selectedDate, events, eventId, displayModal} = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const dateFormat = "D";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div
                        className={`col cell ${ !dateFns.isSameMonth(day, monthStart)
                        ? "disabled"
                        : dateFns.isSameDay(day, selectedDate)
                            ? "selected"
                            : ""}`}
                        key={day}
                        onClick={() => this.onDateClick(dateFns.parse(cloneDay))}>
                        <span className="number">{formattedDate}</span>
                        <Event
                            events={events[formattedDate]}
                            day={formattedDate}
                            deleteEvent={this.deleteEvent}
                            eventId={eventId}
                            displayModal={displayModal}
                            toggleClass={this.toggleClass}/>
                    </div>
                );
                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }

    onDateClick = day => {
        const {currentMonth} = this.state;
        this.formatDate()
        this.setState({selectedDate: day, showForm: true});
    };

    nextMonth = () => {
        const {selectedDate} = this.state
        var month = dateFns
            .addMonths(this.state.currentMonth, 1)
            .getMonth() + 1

        if (month < 10) {
            month = '0' + month
        }

        // console.log('month', month)
        axios //Axios request to get all of the events when the page renders
            .get('/users/events', {
            params: {
                event_month: month,
                user_id: 1
            }
        })
            .then(res => {
                // console.log('res', res.data.user)
                this.setState({
                    events: res
                        .data
                        .user
                        .reduce((acc, item) => ({
                            ...acc,
                            [item.event_day]: res
                                .data
                                .user
                                .filter((i) => i.event_day === item.event_day)
                                // Takes incoming data [Object, Object] turns it into -> event_day:
                                // [{event_details_object}] and passes this as props to Event component
                        }), {})
                })
            })

        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    }

    prevMonth = () => {
        const {selectedDate} = this.state
        var month = dateFns
            .subMonths(this.state.currentMonth, 1)
            .getMonth() + 1

        if (month < 10) {
            month = '0' + month
        }

        axios //Axios request to get all of the events when the page renders
            .get('/users/events', {
            params: {
                event_month: month,
                user_id: 1
            }
        })
            .then(res => {
                // console.log('res', res.data.user)
                this.setState({
                    events: res
                        .data
                        .user
                        .reduce((acc, item) => ({
                            ...acc,
                            [item.event_day]: res
                                .data
                                .user
                                .filter((i) => i.event_day === item.event_day)
                                // Takes incoming data [Object, Object] turns it into -> event_day:
                                // [{event_details_object}] and passes this as props to Event component
                        }), {})
                })
            })

        // console.log('month', month)

        // console.log('month', month)
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
    };

    render() {
        const {showForm, selectedDate, date, events, message} = this.state
        // console.log('events from states', events)
        return (
            <div>
                <div className="calendar">
                    {this.renderHeader()}
                    {this.renderDays()}
                    {this.renderCells()}
                </div>

                {showForm
                    ? <Form
                            date={date}
                            hideForm={this.hideForm}
                            onSubmit={this.onSubmit}
                            handleDescriptionChange={this.handleDescriptionChange}
                            handleStartTimeChange={this.handleStartTimeChange}
                            handleEndTimeChange={this.handleEndTimeChange}/>
                    : ''}
                {message}
            </div>
        )
    }
}

export default Calendar;

// Complete documentation and in-depth comments can be found here :
// https://blog.flowandform.agency/create-a-custom-calendar-in-react-3df1bfd0b72
// 8 by Matej Kovač