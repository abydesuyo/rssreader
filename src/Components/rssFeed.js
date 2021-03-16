import React, { Component } from 'react';
import './rssFeed.css'

const headers = ['ID','ID','Type','Product','Action','Type','IDontKnow','IDontKnow','Empty','DCF','StartDate','Empty','ExecutionDateUTC','Empty','Empty','ExecutionDateGMT','EndDate','Empty','Rate','Empty','Empty','Empty','Tenor','Empty','Empty','Empty','Empty','Empty','PayIndex','IDontKnow','IDontKnow','IDontKnow','IDontKnow','IDontKnow','IDontKnow','IDontKnow','PayCurrency','RecCurrency','Empty','Empty','Empty','Empty','Empty','Empty','Empty','Empty','PayFreq','RecFreq','IDontKnow','IDontKnow','Empty','Empty','Empty','Empty','Empty','Empty','Empty','PaySettleCurr','RecSettleCurr','Empty','Empty','Empty','Empty','Empty','Empty','RecIndex','Empty','Empty','Empty','Empty','Empty','Empty','SEF']
// const parseUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';
const htmlparser2 = require("htmlparser2");
const corsURL = 'https://cors-anywhere.herokuapp.com/';
// const fetch = require("node-fetch");
// const RSS_URL = `https://kgc0418-tdw-data-0.s3.amazonaws.com/cftc/rss/CFTC_RSS_RATES.rss`;
// const rssUrl = 'https://kgc0418-tdw-data-0.s3.amazonaws.com/cftc/rss/CFTC_RSS_RATES.rss';
// const rssUrl = 'https://kgc0418-tdw-data-0.s3.amazonaws.com/ca/rss/CA_RSS_RATES.rss';

// var Feed = require('rss-to-json');
// Feed.load('https://morioh.com/feed').then(rss => {
//     console.log(JSON.stringify(rss, null, 3));
// });
 
class RSSFeed extends Component {

   constructor(props) {
      super(props);
      this.state = {
         error: null,
         isLoaded: false,
         tradefeed: {}
       };
    }

    fetchTradeFeed = async() => { 
      // fetch(parseUrl + this.props.url)
      fetch(corsURL + this.props.url
      , {
      //   crossDomain:true,
      //   method: 'POST',
        headers: {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'},
      //   // mode: 'cors',
      //   // Accept: 'text/html',
      //   // Cookie: 'Version=1',
      //   // headers: {
      //   //   'Access-Control-Allow-Origin':'http://localhost:3000/',
        // }
      })
      // fetch(RSS_URL)
      .then(response => response.text())
      // .then(res => res.json())
      .then(content => new htmlparser2.parseFeed(content))
      // Feed.load(this.props.url)
      // .then(rss => {JSON.stringify(rss, null, 3);})
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            tradefeed: data
          });
          console.log(data);
        },
        // error handler
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
   }

   componentDidMount() 
   {
      this.fetchTradeFeed();
   }


  render() {

    const { error, isLoaded, tradefeed } = this.state;

    if (error) {
      return (
        <section id="rssfeed">
          <div className="tradeFeed">
            Error: {error.message}
          </div>
        </section>
      );
    } 
    else if (!isLoaded) {
      return (
        <section id="rssfeed">
          <div className="tradeFeed">
            Loading...
          </div>
        </section>
      );
    } 
    else {

      return (
         <section id="rssfeed">
          {/* <h2 >{tradefeed.feed.url.split('/')[tradefeed.feed.url.split('/').length-1].split('_')[0]}-{tradefeed.feed.title}</h2> */}
          <h2> {this.props.url.split('/')[this.props.url.split('/').length-1].split('_')[0]} - {tradefeed.title} </h2>
            <div className="table-wrapper">  
                     {/* <div><pre>{JSON.stringify(tradefeed, null, 2) }</pre></div> */}
                  <div id="rssfeed" >
                    <table>
                     <tr>
                        {
                          headers.map(header => <th>{header}</th>)
                        }
                      </tr>
                        {tradefeed.items.map(
                          item => 
                          <tr>
                            {/* <tr>
                              <b>{item.title}</b>
                            </tr>
                            <tr>
                              {item.pubDate}
                            </tr> */}
                            {/* <tr className="tradeTableRow"> */}
                              {item.description.split(',').map( element => <td>{element.replace(/['"]+/g, '')}</td>)}
                            {/* </tr> */}
                            <br/>
                          </tr>)
                        }
                    </table>
                  </div>
              </div>
      </section>
      );
   }
   }
}

export default RSSFeed;
