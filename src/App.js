// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
// import RSSFeed from './Components/rssFeed';
import Feeds from './Components/feedbuilder';
import $ from 'jquery';

// function reloadData(){
//   window.location.reload(false);
// }

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      config: {},
      timeout:20
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  getConfig(){
    $.ajax({
      url:'config.json',
      dataType:'json',
      cache: false,
      success: function(data){
        this.setState({config: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
        alert(err);
      }
    });
  }

  componentDidMount(){
    this.getConfig();
  }

  handleChange(event) {
    this.setState({timeout: event.target.value});
  }

  handleSubmit(event) {
    alert(`Your Current Refresh Rate is : ${this.state.timeout} seconds`);
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <div className="Main">
          <h1>Real Time DTCC Trade Feeds</h1>
          <div>
            {/* <button onClick={window.location.reload(false)}>Reload Feeds</button> */}
            {/* <span className="options"> */}
            <input type="submit" value="Refresh" />
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="5">15</option>
              <option value="10">25</option>
              <option value="20">50</option>
            </select>
            {/* </span> */}
          </div>
          </div>
            <Feeds data={this.state.config.rssfeeds}/>
        </div>
      
    );
  }
}

export default App;

