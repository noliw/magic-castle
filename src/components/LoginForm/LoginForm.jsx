import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../SignupForm/SignupFormStyle.css'
import * as authService from '../../services/authService'

const LoginForm = props => {
  const [formData, setFormData] = useState({
    email: '',
    pw: '',
  })
  const navigate = useNavigate()
  const [msg, setMsg] = useState('')

  const handleChange = e => {
    setMsg('')
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      await authService.login(formData)
      props.handleSignupOrLogin()
      navigate('/posts')
    } catch (err) {
      setMsg(err.message)
    }
  }

  return (
    <div className="signup-page">

        <div className='form-container'>
          <div className="title-container">
            <h1>Log In</h1>
            {msg
              ? <h3>{msg}</h3>
              : <h3>Share more feels!</h3>
            }

          </div>

          <form className="register-form" onSubmit={handleSubmit}>

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
              name="pw"
              type="password"
              autoComplete="off"
              placeholder="Password"
              onChange={handleChange}
              value={formData.pw}
            />

            <button
              autoComplete="off"
              id="submit-button"
              type="submit"
            >Log In</button>
          </form>
          <div className="redirect-container">
            <p>Don't have an account?</p>
            <Link className="redirect-link" to="/signup">
              Sign Up
            </Link>
          </div>

        </div>

    </div>
  )
}

export default LoginForm
