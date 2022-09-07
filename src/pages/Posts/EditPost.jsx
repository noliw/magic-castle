import React, { useState, useEffect } from 'react'
import { useParams} from 'react-router'
import { useLocation, useNavigate } from 'react-router-dom'
import '../../components/PostForm/CreatePost.css'


//Services
import * as postService from '../../services/postService'

const EditPost = (props) => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [image, setImage] = useState('')
  const [formData, setFormData] = useState(location.state)
  const {title, body, tags} = formData

  const handleEditPost = async (e) => {
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
        finalFormData.image=res.url
      }
      await postService.updatePost(finalFormData)
      navigate(`/posts/${id}`)
    } catch (error) {
      throw error
    }
  }

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await postService.getPostById(id)      
        postData.tags = postData.tags.map((tag) => (
          tag.tagName
        )).join(', ')
        setFormData(postData)
      } catch (error) {
        throw error
      }
    }
    fetchPost()
  }, [id])

  return (
    <div className="layout">
      <form className="create-post-form" onSubmit={handleEditPost}>
        <div className='form-header'>
        <h1 className='edit-title'>Edit Post</h1>
        </div>
        <div className='form-body'>
          <div className='horizontal-group'>
            <div className='form-group left'>
              <label className='label-title'>Edit Title: </label>
                <input className='form-input'
                  required
                  name="title"
                  autoComplete='off'
                  placeholder="Enter title here"
                  value={title}
                  onChange={handleChange}
                />
              </div>
                <div className='form-group right'>
                <label className='label-title'>Add an Image: </label>
              <input className='form-input'
                type='file'
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>          
      <div className='form-group description'>
          <label className='label-title'>Edit Description: </label>
          <textarea className='form-input body edit'
            required
            name="body"
            autoComplete='off'
            placeholder="Enter description here"
            value={body}
            onChange={handleChange}
          />
      </div>
      <div className='form-group tags'>
          <label className='label-title'>Edit Tags: </label>
          <textarea className='form-input tags'
            style={{height: "100px", width: "300px"}}
            required
            name="tags"
            autoComplete='off'
            placeholder="Ex: apple, pear, tiger"
            value={tags}
            onChange={handleChange}
          />
      </div>
      <div className='btnWrapper'>
        <button type="submit" className='updateBtn'>Save Changes</button>
      </div>
    </div>
  </form>
  </div>
  )
}

export default EditPost