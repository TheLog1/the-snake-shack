import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
// import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import apiUrl from '../../apiConfig'
import { createSnake } from '../../api/snake'
import messages from '../AutoDismissAlert/messages'

const SnakeCreate = ({ msgAlert, user }) => {
  const [snake, setSnake] = useState({ species: '', name: '', morph: '', shed: '', fed: '' })
  const [createdSnakeId, setCreatedSnakeId] = useState(null)

  const handleChange = event => {
    event.persist()
    setSnake(prevSnake => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedSnake = Object.assign({}, prevSnake, updatedField)
      return editedSnake
    })
  }
  const handleSubmit = event => {
    event.preventDefault()
    // const msgAlert = this.props
    createSnake(user, snake)
      .then(res => setCreatedSnakeId(res.data.snake._id))
      .then(() => msgAlert({
        heading: 'Create Snake Success',
        message: messages.createSnakeSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Failed To Create Snake: ',
        message: messages.createSnakeFailure,
        variant: 'danger'
      }))
  }

  if (createdSnakeId) {
    return <Redirect to='/snakes' />
  }

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Add A Snake</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="species">
            <Form.Label>Species</Form.Label>
            <Form.Control
              required
              type="species"
              name="species"
              value={snake.species}
              placeholder="Enter species"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              name="name"
              value={snake.name}
              type="text"
              placeholder="Name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="morph">
            <Form.Label>Morph</Form.Label>
            <Form.Control
              required
              name="morph"
              value={snake.morph}
              type="text"
              placeholder="Morph"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="shed">
            <Form.Label>Shed</Form.Label>
            <Form.Control
              required
              name="shed"
              value={snake.shed}
              type="text"
              placeholder="Shed"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="fed">
            <Form.Label>Fed</Form.Label>
            <Form.Control
              required
              name="fed"
              value={snake.fed}
              type="text"
              placeholder="Fed"
              onChange={handleChange}
            />
          </Form.Group>
          <Button className="btn btn-submit"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default SnakeCreate
