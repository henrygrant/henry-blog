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

  const [blogs, setBlogs] = useState([]);
  
  useEffect(() => {
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
    </div>
  );
}

export default App;
