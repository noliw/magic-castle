import { useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Header from './pages/Header/Header'
import SignupForm from './components/SignupForm/SignupForm'
import LoginForm from './components/LoginForm/LoginForm'
import Landing from './pages/Landing/Landing'
import Profile from './pages/Profile/Profile'
import CreatePost from './components/PostForm/CreatePost'
import EditPost from './pages/Posts/EditPost'
import PostDetails from './pages/Posts/PostDetails'
import Main from './pages/Main/Main'
import * as authService from './services/authService'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const navigate = useNavigate()
  const [showNav, setShowNav] = useState(false)
  const [title, setTitle] = useState('')

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    setTitle('')
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }



  return (
    <> 
      <header>
      <Header user={user} showNav={showNav} setShowNav={setShowNav} handleLogout={handleLogout} title={title}/>
      </header>
      <div onClick={()=> showNav? setShowNav(!showNav) : null}>
    
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/signup"
          element={<SignupForm handleSignupOrLogin={handleSignupOrLogin} setTitle={setTitle} />}
        />
        <Route
          path="/login"
          element={<LoginForm handleSignupOrLogin={handleSignupOrLogin}/>}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile user={user} setTitle={setTitle}/> : <Navigate to="/login" />}
        />
        <Route path='/posts'
          element={<Main user={user} setTitle={setTitle}/>}
        />
        <Route path='/posts/:id'
          element={user ? <PostDetails user={user} /> : <Navigate to="/login"/>}
        />
        <Route
          path="/posts/:id/edit"
          element={user ? <EditPost user={user} setTitle={setTitle}/> : <Navigate to="/login" />}
        />
        <Route path="/new"
          element={user ? <CreatePost user={user} setTitle={setTitle}/> : <Navigate to="/login"/>}
        />
      </Routes>
      </div>
      
    </>
  )
}

export default App
