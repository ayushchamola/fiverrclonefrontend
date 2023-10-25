import { useLocation, useNavigate } from 'react-router-dom'
import newRequest from '../../utils/newRequest'
import React, { useEffect } from 'react'

const Success = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const payment_intent = params.get('payment_intent')

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.put('/orders', { payment_intent })
        setTimeout(() => {
          navigate('/orders')
        }, 5000)
      } catch (error) {
        console.log(error)
      }
    }
    makeRequest()
  }, [])
  return (
    <div>
      Paymetn successfull. You are being redirected to orders page. Please do
      not close the page.
    </div>
  )
}

export default Success
