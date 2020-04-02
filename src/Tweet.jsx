import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

function Tweet(props) {

  const urlify = text => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, '<a href="$1">$1</a>')
  }

  const linkifyTwitterHandles = text => {
    const twitterHandleRegex = /(@(\w){1,15})/g
    return text.replace(twitterHandleRegex, '<a href="$1">$1</a>')
  }

  const htmlifyTweet = text => {
    let ret = text;
    ret = urlify(text);
    ret = linkifyTwitterHandles(ret);
    return ret;
  }

  const imagesFromTweet = tweet => {
    if(tweet.entities.media) {
      return tweet.entities.media.map(img => (
        <div className='imageContainer' key={img.id}>
          <img className='image' src={img.media_url_https} alt={img.media_url_https}/>
        </div>
      ))
    } else {
      return null;
    }
  }

  function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
  }

  return (
    <div className="tweet" key={props.tweet.id}>
      <div className="header">
        <div className="date">{formatDate(new Date(props.tweet.created_at))}</div>
        <div className="link">
          <a href="twitter.com/_chnwx">
            <FontAwesomeIcon icon={faTwitter}/>
          </a>
        </div>
      </div>
      <div className="content" dangerouslySetInnerHTML={{__html: htmlifyTweet(props.tweet.text)}}/>
      {imagesFromTweet(props.tweet)} 
    </div>
  )
}

export default Tweet;
