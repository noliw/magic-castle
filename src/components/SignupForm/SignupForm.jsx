import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../components/SignupForm/SignupFormStyle.css'
import * as authService from '../../services/authService'

import Avatars from '../../pages/Avatars/Avatars'
import cat from '../../assets/avatars/cat.png'

const SignupForm = props => {
  const navigate = useNavigate()
  const [popup, setPopup] = useState(false)
  const [msg, setMsg] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: cat
  })

  const handlePopup = () => {
    setPopup(!popup)
  }

  const handleChange = e => {
    setMsg('')
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await authService.signup(formData)
      props.handleSignupOrLogin()
      navigate('/posts')
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  return (
    <div className="signup-page">
      {popup &&
        <Avatars
          formData={formData}
          handleChange={handleChange}
          handlePopup={handlePopup}
        />
      }

        <div className='form-container'>
          <div className="title-container">
            <h1>Create an Account</h1>
            {msg
              ? <h3>{msg}</h3>
              : <h3>Start sharing your feels</h3>
            }

          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            <input
              required
              name="name"
              type="text"
              autoComplete="off"
              placeholder="Username"
              onChange={handleChange}
              value={formData.name}
            />
            <input
              required
              name="email"
              type="email"
              autoComplete="off"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
            />
            <input
              required
              name="password"
              type="password"
              autoComplete="off"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
            />

            <button
              type="button"
              autoComplete="off"
              id="avatar-button"
              onClick={handlePopup}
            >Select Avatar</button>

            <button
              autoComplete="off"
              id="submit-button"
              type="submit"
            >SIGN UP</button>
          </form>
          <div className="redirect-container">
            <p>Already have an account?</p>
            <Link className="redirect-link" to="/login">
              Log In
            </Link>
          </div>

        </div>

    </div>
  )
}

export default SignupForm
