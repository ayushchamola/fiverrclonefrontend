import React from 'react'
import Navbar from '../src/components/navbar/Navbar'
import Home from '../src/pages/home/Home'
import Footer from '../src/components/footer/Footer'
import Messages from '../src/pages/messages/Messages'
import Message from '../src/pages/message/Message'
import Orders from '../src/pages/orders/Orders'
import Gig from '../src/pages/gig/Gig'
import Gigs from '../src/pages/gigs/Gigs'
import Add from '../src/pages/add/Add'
import MyGigs from '../src/pages/myGigs/MyGigs'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Pay from './pages/pay/Pay'
import Success from './pages/success/success'

import './App.scss'

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    )
  }
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/gigs',
          element: <Gigs />,
        },
        {
          path: '/gig/:id',
          element: <Gig />,
        },
        {
          path: '/orders',
          element: <Orders />,
        },
        {
          path: '/mygigs',
          element: <MyGigs />,
        },
        {
          path: '/add',
          element: <Add />,
        },
        {
          path: '/messages',
          element: <Messages />,
        },
        {
          path: '/message/:id',
          element: <Message />,
        },
        {
          path: '/pay/:id',
          element: <Pay />,
        },
        {
          path: '/success',
          element: <Success />,
        },
      ],
    },
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
