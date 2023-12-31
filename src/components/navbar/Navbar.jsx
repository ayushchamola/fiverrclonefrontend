import React, { useEffect, useState } from 'react'
import './Navbar.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import newRequest from '../../utils/newRequest'

const Navbar = () => {
  const [active, setActive] = useState(false)
  const [open, setOpen] = useState(false)

  const { pathname } = useLocation() // gives info about current URL

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', isActive)
    return () => {
      window.removeEventListener('scroll', isActive)
    }
  }, [])
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await newRequest.post('/auth/logout')
      localStorage.setItem('currentUser', null)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className={active || pathname !== '/' ? 'navbar active' : 'navbar'}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span className="text">fiverr</span>
            <span className="dot">.</span>
          </Link>
        </div>
        <div className="links">
          <span>Fiverr Business</span>
          <span>Explore</span>
          <span>English</span>
          <span>
            <Link to="/login" className="link">
              Sign In
            </Link>
          </span>
          {!currentUser?.isSeller && <span>Become a seller</span>}
          {!currentUser && (
            <Link to="/register" className="link">
              <button className="join">Join</button>
            </Link>
          )}
          {currentUser && (
            <div
              className="user"
              onClick={() => {
                setOpen(!open)
              }}
            >
              <img src={currentUser.img || '/img/noavatar.png'} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser?.isSeller && (
                    <>
                      <Link to="/mygigs" className="link">
                        Gigs
                      </Link>
                      <Link to="/add" className="link">
                        Add a New Gig
                      </Link>
                    </>
                  )}
                  <Link to="/orders" className="link">
                    Orders
                  </Link>
                  <Link to="/messages" className="link">
                    Messages
                  </Link>
                  <Link onClick={handleLogout} className="link">
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !== '/') && (
        <>
          <hr />
          <div className="menu">
            <Link className="link" to="/">
              Graphics and Design
            </Link>
            <Link className="link" to="/">
              Video & Animation
            </Link>
            <Link className="link" to="/">
              Writing and Translation
            </Link>
            <Link className="link" to="/">
              AI Services
            </Link>
            <Link className="link" to="/">
              Digital Marketing
            </Link>
            <Link className="link" to="/">
              Music & Audio
            </Link>
            <Link className="link" to="/">
              Programming & Tech
            </Link>
            <Link className="link" to="/">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  )
}

export default Navbar
