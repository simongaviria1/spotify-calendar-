import React, {Component} from 'react'
import '../CSS/style.css'

class Form extends Component {
    constructor() {
        super();
        this.state = {
            date: ''
        }
    }

    render() {
        const {date} = this.props
        const {hideForm, onSubmit, handleDescriptionChange, handleStartTimeChange, handleEndTimeChange} = this.props
        return (
            <div id='event-form'>
                <form onSubmit={onSubmit}>
                    <div>
                        Date:
                        <input type='date' placeholder='date' value={date}/>
                        <br/>

                        <label for="start">Start Time:</label>
                        <input type="time" id="start" name="start" onChange={handleStartTimeChange}/>
                    </div>

                    <div>
                        <label for="end">End Time:</label>
                        <input type="time" id="end" name="end" onChange={handleEndTimeChange}/>
                    </div>
                    <input
                        type='text'
                        placeholder='description'
                        onChange={handleDescriptionChange}/>
                    <br/>
                    <input type='submit'/>
                    <button onClick={hideForm}>Cancel</button>
                </form>
            </div>
        )
    }
}

export default Form;

// You found me
// https://www.reddit.com/r/MemeEconomy/comments/5r5q06/spotify_song_title_memes
// _ on_the_rise_buy_buy_buy/