import React, { Component } from 'react';
// import RSSFeed from './Components/rssFeed';
import RSSFeed from './rssFeed';

class Feeds extends Component {
    
    render()
    {
        if(this.props.data){
            var feeds= this.props.data.map(function(feed){
                return <RSSFeed url={feed.url}/>
                })
        }

        return(
            <div className="TradeFeed">
                {feeds}
            </div>
        )
    }
}

export default Feeds;