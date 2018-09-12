import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <form>
          <fieldset>
            <legend>Contact Info</legend>
            {/* <label>First Name:</label> */}
            <input
              id="firstName"
              name="firstName"
              type="firstName"
              placeholder="First Name"
              required
            />
            <span class="tick"></span>
            {/* <label>Last Name:</label> */}
            <input
              id="lastName"
              name="lastName"
              type="lastName"
              placeholder="Last Name"
              required
            />
            <span class="tick"></span>
            {/* <label>Email:</label> */}
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
            />
            <span class="tick"></span>
            {/* <label>Event Date:</label> */}
            <input
              id="date"
              name="date"
              type="date"
              required
            />
            <input type="submit" value="Send" />
          </fieldset>
        </form>
      </div>
    );
  }
}

export default App;
