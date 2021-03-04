import React, { Component } from 'react';

const parseUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';
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
                  <div className="widget widget_tweets">
                     <h4 className="widget-title">Trade Feed</h4>
                     {/* <div><pre>{JSON.stringify(tradefeed, null, 2) }</pre></div> */}
                     <ul id="rssfeed">
                        {tradefeed.items.map(item => <li><span><b>{item.title}</b><br/>{item.pubDate}<br/>{item.description}<br/></span><br/></li>)}
                     </ul>
                  </div>
         </div>
      </section>
      );
   }
   }
}

export default RSSFeed;
