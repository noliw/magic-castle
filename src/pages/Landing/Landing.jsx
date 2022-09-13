import '../Landing/LandingStyle.css'
import { Link } from 'react-router-dom'

import Logo from '../../assets/logo/landing_logo.png'

const Landing = () => {
  return (
    <div className="landing-page">
      <div className="landing-elements">
        <h1>MAGIC     CASTLE</h1>
        <h3>SignUp/Login below to enter the a magical world</h3>
        <div className="landing-button-container">
          <button><Link to="/signup">Sign Up</Link></button>
          <button><Link to="/login">Log In</Link></button>
        </div>
      </div>
    </div>
  )
}

export default Landing
