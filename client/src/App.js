import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const queryString = require('querystring');

class App extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      eventDate: '',
      messageFromServer: '' 
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTextChange(e) {
    e.preventDefault();
    if(e.target.name === 'firstName') {
      this.setState({
        firstName: e.target.value
      });
    }
    if(e.target.name === 'lastName') {
      this.setState({
        lastName: e.target.value
      });
    }
    if(e.target.name === 'email') {
      this.setState({
        email: e.target.value
      });
    }
    if(e.target.name === 'date') {
      this.setState({
        eventDate: e.target.value
      });
      let elem = document.getElementById('date');
      document.body.insert
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    const formEl = this.formEl;
    // const formLength = formEl.length;
    if(formEl.checkValidity() === false) {
      document.getElementById("message-handler").innerHTML = 'Please, fill the form correctly.';
    } else {
        axios.post('user',
          queryString.stringify({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            eventDate: this.state.eventDate
          }), {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                }
              }
        ).then((response) => {
            this.setState({
              messageFromServer: response.data.message,
              firstName: '',
              lastName: '',
              email: '',
              eventDate: ''
            })
        });
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Job Interview Assigment</h1>
          <h5><i>created by Ernest Ziemkowski</i></h5>  
        </header>
        <form onSubmit={this.handleSubmit} noValidate ref={form => (this.formEl = form)}>
          <fieldset>
            <legend>Contact Info</legend>
            <div id="message-handler">
              {this.state.messageFromServer}
            </div>
            <input
              id="firstName"
              name="firstName"
              type="firstName"
              value={this.state.firstName}
              onChange={this.handleTextChange}
              placeholder="First Name"
              required
            />
            <span className="tick"></span>
            <input
              id="lastName"
              name="lastName"
              type="lastName"
              value={this.state.lastName}
              onChange={this.handleTextChange}
              placeholder="Last Name"
              required
            />
            <span className="tick"></span>
            <input
              id="email"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleTextChange}
              placeholder="Email"
              required
            />
            <span className="tick"></span>
            <input
              id="date"
              name="date"
              value={this.state.eventDate}
              onChange={this.handleTextChange}
              type="date"
              required
            />
            <span className="tick"></span>
            <input type="submit" value="Send" />
          </fieldset>
        </form>
      </div>
    );
  }
}

export default App;
