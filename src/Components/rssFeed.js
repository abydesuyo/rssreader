import React, { Component } from 'react';
import './rssFeed.css'

const headers = ['ID','ID','Type','Product','Action','Type','IDontKnow','IDontKnow','Empty','DCF','StartDate','Empty','ExectionDateUTC','Empty','Empty','ExectionDateGMT','EndDate','Empty','Rate','Empty','Empty','Empty','Tenor','Empty','Empty','Empty','Empty','Empty','PayIndex','IDontKnow','IDontKnow','IDontKnow','IDontKnow','IDontKnow','IDontKnow','IDontKnow','PayCurrency','RecCurrency','Empty','Empty','Empty','Empty','Empty','Empty','Empty','Empty','PayFreq','RecFreq','IDontKnow','IDontKnow','Empty','Empty','Empty','Empty','Empty','Empty','Empty','PaySetttleCurr','RecSettleCurr','Empty','Empty','Empty','Empty','Empty','Empty','RecIndex','Empty','Empty','Empty','Empty','Empty','Empty','SEF']
const parseUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';
// const rssUrl = 'https://kgc0418-tdw-data-0.s3.amazonaws.com/cftc/rss/CFTC_RSS_RATES.rss';
// const rssUrl = 'https://kgc0418-tdw-data-0.s3.amazonaws.com/ca/rss/CA_RSS_RATES.rss';
// const rssUrl = 'https://kgc0418-tdw-data-0.s3.amazonaws.com/cftc/rss/CFTC_RSS_RATES.rss';

 
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
      fetch(parseUrl + this.props.url)
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
          <h2 >{tradefeed.feed.url.split('/')[tradefeed.feed.url.split('/').length-1].split('_')[0]}-{tradefeed.feed.title}</h2>
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
