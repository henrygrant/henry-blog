import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './Header'
import Tweet from './Tweet'
// import BlogPost from './BlogPost'


function App() {

  // const getBlogs = async () => {
  //   let resp = await fetch('https://us-central1-henrygrant.cloudfunctions.net/blogs');
  //   let data = await resp.json();
  //   setBlogs(data);
  // }

  const getTweets = async () => {
    let resp = await fetch('https://us-central1-henrygrant.cloudfunctions.net/tweets');
    let data = await resp.json();
    console.log(data)
    setTweets(data);
  }

  // const [blogs, setBlogs] = useState([]);
  const [tweets, setTweets] = useState([]);
  
  useEffect(() => {
    getTweets();
    // getBlogs();    
  }, [])
  
  return (
    <div className="App">
      <Header/>
      <div className="postContainer">
        <div className="tweets">
          {tweets ? tweets.map(tweet => (
            <Tweet tweet={tweet} key={tweet.id}/>
          )) : null}
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
