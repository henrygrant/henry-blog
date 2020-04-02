import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faInstagram, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

function Header(props) {
  return (
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
  )
}

export default Header;
