import React, {Component} from 'react';
import Style from './CSS/style.css'

import Calendar from './Components/Calendar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <div id="logo">
            {/* <span className="icon">date_range</span>
            <span>
              Spotify baloney 
            </span> */}
          </div>
        </header>
        <main>
          <Calendar/>
        </main>
      </div>
    )
  }
}

export default App;
