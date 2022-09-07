import React from "react"
import { Link } from 'react-router-dom'
import "./CommentSection.css"

const CommentList = (props) => {
  const authorId = props.comment.commenter?._id ? props.comment.commenter._id : props.comment.commenter
  const isAuthor = props.user?.profile === authorId

  return (
    <div className="comment-card">
        <div className="comment">
          <img src={props.comment.commenter.avatar} alt="user avatar" />
          <Link to={`/profile/${props.comment.commenter._id}`}><h3>{props.comment.commenter.name}</h3></Link>
          <p>
            {props.comment.comment_text}
          </p>
          {isAuthor &&
          <button className='deleteBtn' onClick={() => props.handleDeleteComment(props.comment._id)}>Delete</button>
          }
        </div>
    </div>
  )
}

export default CommentList