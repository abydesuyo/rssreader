// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
// import RSSFeed from './Components/rssFeed';
import Feeds from './Components/feedbuilder';
import $ from 'jquery';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      config: {}
    };

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


  render() {
    return (
      <div className="App">
        <div className="Main">
          <h1>Real Time DTCC Trade Feeds</h1>
        </div>
          <Feeds data={this.state.config.rssfeeds}/>
      </div>
      
    );
  }
}

export default App;

