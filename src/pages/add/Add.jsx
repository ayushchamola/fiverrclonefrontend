import React, { useReducer, useState } from 'react'
import './Add.scss'

import { INITIAL_STATE, gigReducer } from '../../reducers/gigReducer'
import upload from '../../utils/upload.js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import newRequest from '../../utils/newRequest.js'

const Add = () => {
  const [cover, setCover] = useState(undefined)
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const navigate = useNavigate()

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE)
  const handleChange = (e) => {
    dispatch({
      type: 'CHANGE_INPUT',
      payload: { name: e.target.name, value: e.target.value },
    })
  }
  const handleFeature = (e) => {
    e.preventDefault()
    dispatch({
      type: 'ADD_FEATURE',
      payload: e.target[0].value,
    })
    e.target[0].value = ''
  }

  const handleUpload = async () => {
    setUploading(true)
    try {
      const coverImg = await upload(cover)

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file)
          return url
        })
      )
      setUploading(false)
      dispatch({
        type: 'ADD_IMAGES',
        payload: { cover: coverImg, images: images },
      })
    } catch (err) {
      console.log(err)
    }
  }
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post('/gigs', gig)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myGigs'])
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate(state)
    navigate('/mygigs')
  }

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="left">
            <label htmlFor="">Title</label>
            <input
              type="text"
              placeholder="eg. I will do somwething i am really good at"
              onChange={handleChange}
              name="title"
            />

            <label htmlFor="">Category</label>
            <select name="cat" id="cat" onChange={handleChange}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <div className="images">
              <div className="imagesInput">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => {
                    setCover(e.target.files[0])
                  }}
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    setFiles(e.target.files)
                  }}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? 'uploading...' : 'Upload'}
              </button>
            </div>
            <label htmlFor="">Description</label>
            <textarea
              name="desc"
              id=""
              cols="30"
              rows="16"
              placeholder="Brief description to introduce your services to the customer"
              onChange={handleChange}
            ></textarea>
            <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="right">
            <label htmlFor="">Service Title</label>
            <input
              type="text"
              placeholder="e.g. One page web design"
              onChange={handleChange}
              name="shortTitle"
            />
            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc"
              id=""
              cols="30"
              rows="10"
              placeholder="Short description of your service"
              onChange={handleChange}
            ></textarea>
            <label htmlFor="">Delivery Time (eg. 3 days)</label>
            <input
              type="number"
              min={1}
              onChange={handleChange}
              name="deliveryTime"
            />
            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              min={1}
              onChange={handleChange}
              name="revisionNumber"
            />
            <label htmlFor="">Add features</label>
            <form action="" onSubmit={handleFeature} className="add">
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">Add</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((f) => {
                return (
                  <div className="item" key={f}>
                    <button
                      onClick={() =>
                        dispatch({ type: 'REMOVE_FEATURE', payload: f })
                      }
                    >
                      {f}
                      <span>X</span>
                    </button>
                  </div>
                )
              })}
            </div>

            <label htmlFor="">Price</label>
            <input type="number" min={1} onChange={handleChange} name="price" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add
