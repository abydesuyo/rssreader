import React, { Component } from 'react';
import './rssFeed.css'

const headers = ['ID','ID','Type','Prodcut','Action','Type','IDontKnow','IDontKnow','Empty','DCF','StartDate','Empty','ExectionDateUTC','Empty','Empty','ExectionDateGMT','EndDate','Empty','Rate','Empty','Empty','Empty','Tenor','Empty','Empty','Empty','Empty','Empty','PayIndex','IDontKnow','IDontKnow','IDontKnow','IDontKnow','IDontKnow','IDontKnow','IDontKnow','PayCurrency','RecCurrency','Empty','Empty','Empty','Empty','Empty','Empty','Empty','Empty','PayFreq','RecFreq','IDontKnow','IDontKnow','Empty','Empty','Empty','Empty','Empty','Empty','Empty','PaySetttleCurr','RecSettleCurr','Empty','Empty','Empty','Empty','Empty','Empty','RecIndex','Empty','Empty','Empty','Empty','Empty','Empty','SEF']
const parseUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';
// const rssUrl = 'https://kgc0418-tdw-data-0.s3.amazonaws.com/cftc/rss/CFTC_RSS_RATES.rss';
// const rssUrl = 'https://kgc0418-tdw-data-0.s3.amazonaws.com/ca/rss/CA_RSS_RATES.rss';
const rssUrl = 'https://kgc0418-tdw-data-0.s3.amazonaws.com/cftc/rss/CFTC_RSS_RATES.rss';

 
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
      fetch(parseUrl + rssUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            tradefeed: result
          });
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
            <div className="tradeFeed">
                     <h2 className="widget-title">Trade Feed</h2>
                     {/* <div><pre>{JSON.stringify(tradefeed, null, 2) }</pre></div> */}
                     <div id="rssfeed">
                     <table className="tradeTable">
                     <tr>
                        {
                          headers.map(header => <th className="tradeTableHead">{header}</th>)
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
                              {item.description.split(',').map( element => <td className="tradeTableCol">{element.replace(/['"]+/g, '')}</td>)}
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
