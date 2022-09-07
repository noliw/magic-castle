import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    comment_text: {
      type: String,
      required: false
    },
    commenter: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }
  },
  { timestamps: true }
)

const tagSchema = new Schema(
  {
    tagName: {
      type: String,
      required: false
    },
  },
)

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  body: {
    type: String, 
    maxLength: 2000,
  },
  added_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  comments: [commentSchema],
  tags: [tagSchema],
}, { timestamps: true })



const Post = mongoose.model('Post', postSchema)

export {
  Post
}