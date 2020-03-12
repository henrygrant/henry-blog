import React, {useState, useEffect} from 'react';
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faInstagram, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'


function App() {

  const getBlogs = async () => {
    let resp = await fetch('https://us-central1-henrygrant.cloudfunctions.net/blogs');
    let data = await resp.json();
    setBlogs(data);
  }

  const getTweets = async () => {
    let resp = await fetch('https://us-central1-henrygrant.cloudfunctions.net/tweets');
    let data = await resp.json();
    console.log(data)
    setTweets(data);
  }

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
          <img className='image' src={img.media_url} alt={img.media_url}/>
        </div>
      ))
    } else {
      return null;
    }
  }

  function formattedDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
  }

  const [blogs, setBlogs] = useState([]);
  const [tweets, setTweets] = useState([]);
  
  useEffect(() => {
    getTweets();
    getBlogs();    
  }, [])
  
  return (
    <div className="App">
      <div className="header">
        <h1 className="title">HenryGrant.dev</h1>
        <div className="links">
          <a href="https://twitter.com/chnwx_">
            <FontAwesomeIcon icon={faTwitter}/>
          </a>
          <a href="https://instagram.com/yesthisishenry">
            <FontAwesomeIcon icon={faInstagram}/>
          </a>
          <a href="https://github.com/henrygrant">
            <FontAwesomeIcon icon={faGithub}/>
          </a>
          <a href="https://www.linkedin.com/in/henry-grant-662227169/">
            <FontAwesomeIcon icon={faLinkedin}/>
          </a>
        </div>
      </div>
      <div className="postContainer">
        <div className="tweets">
          {tweets ? tweets.map(tweet => 
            (
              <div className="tweet" key={tweet.id}>
                <div className="header">
                  <div className="date">{formattedDate(new Date(tweet.created_at))}</div>
                  <div className="link">
                    <a href="twitter.com/_chnwx">
                      <FontAwesomeIcon icon={faTwitter}/>
                    </a>
                  </div>
                </div>
                <div className="content" dangerouslySetInnerHTML={{__html: htmlifyTweet(tweet.text)}}/>
                {imagesFromTweet(tweet)} 
              </div>
            )
            ) : null}
        </div>
        {/*
        <div className="blogs">
          {blogs ? blogs.map(blog => 
            (
              <div className="blog" key={blog.content}>
                <div className="title">{blog.title + ' - ' + blog.date}</div>
                <div className="content" dangerouslySetInnerHTML={{__html: blog.content}}/>
              </div>
            )
            ) : null}
        </div>
        */}
      </div>
    </div>
  );
}

export default App;
