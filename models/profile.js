import mongoose from 'mongoose'


const profileSchema = new mongoose.Schema(
  {
    email: {type: String, required: true, lowercase: true, unique: true},
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
      }
    ],
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
      }
    ]
  },
  { timestamps: true }
)

const Profile = mongoose.model('Profile', profileSchema)

export {Profile}
