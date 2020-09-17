import React, { useState, useEffect } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { updateSnake, showSnake } from '../../api/snake'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const UpdateSnake = ({ msgAlert, user, match }) => {
  const [snake, setSnake] = useState({ species: '', name: '', morph: '', shed: '', fed: '' })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    showSnake(user, snake, match.params.id)
      .then(res => setSnake(res.data.snake))
      .catch(console.error)
  }, [])

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
    updateSnake(user, snake, match.params.id)
      .then(() => setUpdated({ updated: true }))
      .then(() => msgAlert({
        heading: 'Update Snake Success',
        message: messages.updateSnakeSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Failed To Update Snake',
        message: messages.updateSnakeFailure,
        variant: 'danger'
      }))
  }

  if (updated) {
    return <Redirect to='/snakes' />
  }

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Update Your Snake</h3>
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

export default withRouter(UpdateSnake)
