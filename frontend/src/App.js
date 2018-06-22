import React, {Component} from 'react';
import Style from './CSS/style.css'

import Calendar from './Components/Calendar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <main>
          <Calendar/>
        </main>
      </div>
    )
  }
}

export default App;
