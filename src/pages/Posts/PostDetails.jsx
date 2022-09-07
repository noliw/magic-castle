import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './PostDetails.css'

// Services
import * as postService from '../../services/postService'

// Components
import PostInfo from '../Posts/PostInfo'
import Comments from '../Comments/Comments'

const PostDetails = (props) => {
  const { id } = useParams()
	const navigate = useNavigate()
  const [post, setPost] = useState()
  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await postService.getPostById(id)
        setPost(postData)
        setComments(postData.comments)
      } catch (error) {
        throw error
      }
    }
    fetchPost()
  }, [id])

  const handleDeletePost = async (postId) => {
    try {
      await postService.deletePost(postId)
      navigate('/posts')
    } catch (error) {
      throw error
    }
  }

  return (
    <div className="layout">
      <div className="post-details">
        {post &&  
          <>
            <PostInfo
              post={post}
              user={props.user}
              handleDeletePost={handleDeletePost}
            />
            <Comments
              post={post}
              setPost={setPost}
              user={props.user}
              comments={comments}
              setComments={setComments}
            />
          </>
        }
      </div>
    </div>
  )
}

export default PostDetails