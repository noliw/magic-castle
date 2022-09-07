import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import '../Main/MainPage.css'

// Services
import { getAllPosts } from '../../services/postService'
import { getProfileById } from '../../services/profileService'

// Components 

const Profile = () => {
  const { id } = useParams()
  

  const [posts, setPosts] = useState([])
  const [profile, setProfile] = useState({})

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfileById(id)
        setProfile(profileData)
      } catch (error) {
        throw error
      }
    }
    fetchProfile()
  }, [id])

  useEffect(() => {
    const fetchAllPosts = async () => {
      const postData = await getAllPosts()
      setPosts(postData)
    }
    fetchAllPosts()
    return () => { setPosts([]) }
  }, [])

  const sortedPosts = posts.filter(post => 
    post.added_by._id === id
  )

  return (
    <div className="all-posts">
      <h1 className="title">{profile?.name}'s Profile</h1>
      <div className="wrapper">
      {sortedPosts.map((post, index) => (
      <Link to={`/posts/${post._id}`} key={index}>
        <div className="media" >
          <div className="layer">
            <p>{post.title}</p>
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


export default Profile