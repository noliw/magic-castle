import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../Main/MainPage.css'

// Services
import { getAllPosts } from '../../services/postService'


// Components 


const Main = () => {
  const [posts, setPosts] = useState([])
  

  useEffect(() => {
    const fetchAllPosts = async () => {
      const postData = await getAllPosts()
      setPosts(postData)
    }
    fetchAllPosts()
    return () => { setPosts([]) }
  }, [])

  return (
    <div className="all-posts">
      <h1 className="title">Home</h1>
      <div className="wrapper">
        {posts.map((post, index) => (
        <Link to={`/posts/${post._id}`} key={index}>
        <div className="media" >
          <div className="layer">
            <p>{post.title}</p>
            <p>By: {post.added_by?.name}</p>
          </div>
          <div className="post" >
            <img src={post.image} alt="img" />
          </div>
        </div>
        </Link>
        ))}
      </div>
    </div>
  )
}


export default Main