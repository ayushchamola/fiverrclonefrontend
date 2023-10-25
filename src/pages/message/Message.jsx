import React from 'react'
import './Message.scss'
import { Link, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'

const Message = () => {
  const { id } = useParams()
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const { isLoading, error, data } = useQuery({
    queryKey: ['messages'],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data
      }),
  })
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post('/messages', message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['messages'])
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    })
    e.target[0].value = ''
  }

  return (
    <div className="message">
      <div className="container">
        <span className="breadCrumbs">
          <Link to="/messages" className="link">
            MESSAGES
          </Link>{' '}
          {`>`} JOHN DOE {`>`}
        </span>
        {isLoading ? (
          'Loading...'
        ) : error ? (
          'Something went wrong'
        ) : (
          <div className="messages">
            {data.map((m) => {
              return (
                <div
                  className={
                    m.userId === currentUser._id ? 'item owner' : 'item'
                  }
                  key={m._id}
                >
                  <img
                    src="https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/58960b09956dc710d2d5a33573261936-1554984111113/750ccab0-8a64-4c91-b9a4-d10039dbf79c.jpg"
                    alt=""
                  />
                  <p>{m.desc}</p>
                </div>
              )
            })}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea
            name=""
            placeholder="write a message"
            id=""
            cols="30"
            rows="10"
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default Message
