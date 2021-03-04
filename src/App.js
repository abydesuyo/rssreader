// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import RSSFeed from './Components/rssFeed';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      appData: {}
    };

  }


render() {
  return (
    <div className="App">
      <RSSFeed/>
    </div>
  );
}
}

export default App;

