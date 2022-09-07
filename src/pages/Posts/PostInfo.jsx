import React from 'react' 
import { Link, useNavigate} from 'react-router-dom'
import './PostInfo.css'

import * as postService from '../../services/postService'

const PostInfo = (props) => {
  const navigate = useNavigate()
  const handleDeletePost = async (postId) => {
    try {
      await postService.deletePost(postId)
      navigate('/posts')
    } catch (error) {
      throw error
    }
  }

  const allTags = props.post.tags.map((tag, index) => (
    <p key={index} >{tag.tagName}</p>
  ))
  const authorId = props.post.added_by?._id ? props.post.added_by._id : props.post.added_by
  const isAuthor = props.user?.profile === authorId

  return (
    <div className="postInfo">
      <div className="leftContainer">
        <div className="postImage">
          <img src={props.post.image} alt="User Uploaded Img"/>
        </div>
          <div className="postTitle">
            <h1>{props.post.title}</h1>
          </div>
          <div className="postUser">
            <h2>By:</h2>
            <img src={props.post.added_by.avatar} alt="user avatar"/>
            <Link to={`/profile/${props.post.added_by._id}`}><h2>{props.post.added_by.name}</h2></Link>
            {isAuthor &&
            <>
            <button className='deleteBtn' onClick={() => handleDeletePost(props.post._id)} >Delete Post</button>
            <button className='updateBtn'><Link className='updateBtnLink' to={`/posts/${props.post._id}/edit`} state={props.post} >Edit Post</Link></button>
            </>
            } 
          </div>
        </div>
        <div className="postInfoDiv">
          <div className="postBody">
            <p>{props.post.body}</p>
          </div>
          <div className="postTags">
            <div style={{display: 'flex'}}><p><b>Tags:</b></p> {allTags}</div>
          </div>
        </div>
    </div>
    
  )
}

export default PostInfo