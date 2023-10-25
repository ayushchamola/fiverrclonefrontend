import React, { useEffect, useState } from 'react'
import './Pay.scss'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import newRequest from '../../utils/newRequest.js'
import { useParams } from 'react-router-dom'
import CheckoutForm from '../../components/checkoutForm/CheckoutForm'
const stripePromise = loadStripe(
  'pk_test_51O3luwSARBfsuvlmXzzd9wP7odGvqvbL8lhEIHITk91KCPMXmwC0GJDdLiUoJhReegyH9kuvfpWUziRYsvZEk2sB008Db2M0Bz'
)

const Pay = () => {
  const { id } = useParams()
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(`/orders/create-payment-intent/${id}`)
        setClientSecret(res.data.clientSecret)
      } catch (err) {
        console.log(err)
      }
    }
    makeRequest()
  }, [])

  const appearance = {
    theme: 'stripe',
  }
  const options = {
    clientSecret,
    appearance,
  }
  return (
    <div className="pay">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default Pay
