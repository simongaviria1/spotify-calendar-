import React, {Component} from 'react'
import dateFns from "date-fns";

// import Modal from './Modal'
import Form from './Form'

class Calendar extends Component {
    constructor() {
        super();
        this.state = {
            currentMonth: new Date(),
            selectedDate: new Date(),
            events: []
        }
    }

    hideForm = () => {
        this.setState({showForm: false})
    }

    onSubmit = (e) => {
        e.preventDefault()
        const {events, start, end, description} = this.state
        this.setState({
            events: [
                ...events, {
                    start: start,
                    end: end,
                    description: description
                }
            ],
            showForm: false
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
        const {currentMonth, selectedDate} = this.state;
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
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    }

    prevMonth = () => {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
    }

    render() {
        const {showForm, selectedDate, date} = this.state
        console.log('state', this.state.selectedDate)
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
            </div>
        )
    }
}

export default Calendar;