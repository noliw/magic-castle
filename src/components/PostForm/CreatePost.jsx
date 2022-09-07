import React, { useState } from 'react'
import { useNavigate } from 'react-router'

// Components
import PostForm from './PostForm'

//Services
import { createPost } from '../../services/postService'

const CreatePost = (props) => {

  const navigate = useNavigate()
  const [image, setImage ] = useState('')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState('')

  const formData = {
    title: title,
    image: image,
    body: body, 
    tags: tags,
    added_by: props.user.profile, 
  }

  const handleCreatePost = async (finalFormData) => {
    try {
      await createPost(finalFormData)
    } catch (error) {
      throw error
    }
  }
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      let finalFormData = { ...formData }
      if (image) {
        const data = new FormData()
        data.append('file', image)
        data.append("upload_preset", "rkjmljnm")
        data.append('folder', 'allthefeels')
        data.append("cloud_name","allthefeels")
        const res = await (await fetch("https://api.cloudinary.com/v1_1/allthefeels/image/upload", {
          method: "post",
          body: data
        })).json()
        finalFormData['image'] = res.url;
      }
      handleCreatePost(finalFormData)
      navigate('/posts')
    } catch (error) {
      throw error
    }
  }

  return (
    <div className="layout">
    <PostForm
      title={title}
      setTitle={setTitle}

      body={body}
      setBody={setBody}

      tags={tags}
      setTags={setTags}

      setImage={setImage}

      handleCreatePost={handleCreatePost}
      handleSubmit={handleSubmit}
    />
  </div>
  )
}

export default CreatePost