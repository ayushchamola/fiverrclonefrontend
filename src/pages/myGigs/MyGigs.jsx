import React from 'react'
import './MyGigs.scss'
import { Link } from 'react-router-dom'
import getCurrentUser from '../../utils/getCurrentUser.js'
import newRequest from '../../utils/newRequest.js'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const MyGigs = () => {
  const currentUser = getCurrentUser()
  const { isLoading, error, data } = useQuery({
    queryKey: ['myGigs'],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => {
        return res.data
      }),
  })
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myGigs'])
    },
  })

  const handleDelete = (id) => {
    mutation.mutate(id)
  }
  return (
    <div className="myGigs">
      {isLoading ? (
        'Loading...'
      ) : error ? (
        'Something went wrong'
      ) : (
        <div className="container">
          <div className="title">
            <h1>Gigs</h1>
            <Link to="/add">
              <button>Add a new Gig</button>
            </Link>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
            {data.map((gig) => {
              return (
                <tr key={gig._id}>
                  <td>
                    <img className="img" src={gig.cover} alt="" />
                  </td>
                  <td>{gig.title}</td>
                  <td>{gig.price}</td>
                  <td>{gig.sales}</td>
                  <td>
                    <img
                      className="delete"
                      src="/img/delete.png"
                      alt=""
                      onClick={() => {
                        handleDelete(gig._id)
                      }}
                    />
                  </td>
                </tr>
              )
            })}
          </table>
        </div>
      )}
    </div>
  )
}

export default MyGigs
