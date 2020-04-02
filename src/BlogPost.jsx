import React from 'react';

function BlogPost(props) {
  return (
    <div className="blog" key={props.blog.content}>
      <div className="title">{props.blog.title + ' - ' + props.blog.date}</div>
      <div className="content" dangerouslySetInnerHTML={{__html: props.blog.content}}/>
    </div>
  )
}

export default BlogPost;
