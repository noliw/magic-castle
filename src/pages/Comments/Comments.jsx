import React from "react"
import * as postService from '../../services/postService'
import "./CommentSection.css"

//Components
import CommentList from './CommentList'
import CreateComment from './CreateComment'

const Comments = (props) => {

  const handleCreateComment = async (formData) => {
    try {
      const newComment = await postService.createComment(props.post._id, formData)
      props.setComments([...props.comments, newComment])
    } catch (error) {
      throw error
    }
  }

  const handleDeleteComment = async (commentId) => {
    try {
      await postService.deleteComment(props.post._id, commentId)
      props.setComments(props.comments.filter(comment => comment._id !== commentId))
    } catch (error) {
      throw error
    }
  }

  return (
    <div className="comment-section">
      <h2> </h2>
      <div className="card-header">
        <CreateComment 
          {...props} 
          handleCreateComment={handleCreateComment}
        />
        {props.comments?.map((comment, index) => (
          <CommentList
            key={index}
            comment={comment}
            user={props.user}
            handleDeleteComment={handleDeleteComment}
          />
        )).reverse()}
      </div>
    </div>
  )
}

export default Comments