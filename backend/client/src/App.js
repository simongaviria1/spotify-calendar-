import React, {Component} from 'react';
import Style from './CSS/style.css'

import axios from 'axios'

import Calendar from './Components/Calendar'

class App extends Component {

  componentWillMount = () => {
    //Hard coding user to be logged in when someone uses app
    //Axios requests cannot be made anon
    axios
      .post('/users/login', {
      username: 'simongaviria1',
      password: 'password'
    })
      .then(res => {
        console.log(res.data.message) //shows whether user logged in
      })
  }
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
