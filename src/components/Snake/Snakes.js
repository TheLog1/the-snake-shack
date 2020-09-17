import React, { useState, useEffect } from 'react'
import { viewSnakes } from '../../api/snake'
import { Link, withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Snakes = ({ msgAlert, user, match }) => {
  const [snakes, setSnakes] = useState([])
  const [deleted, setDeleted] = useState(false)
  useEffect(() => {
    viewSnakes(user, snakes)
      .then(res => setSnakes(res.data.snakes))
      .catch(console.error)
  }, [deleted])
  const destroy = (id) => {
    axios({
      url: apiUrl + `/snakes/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then(() => setDeleted(id))
      .then(() => msgAlert({
        heading: 'Delete Snake Success',
        message: messages.deleteSnakeSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Delete Snake Failure',
        message: messages.deleteSnakeFailure,
        variant: 'danger'
      }))
  }
  let snakesToRender
  if (snakes) {
    snakesToRender = snakes.map(snake => {
      return <div key={snake._id}>
        <div className="viewsnake">
          <Container>
            <Row>
              <Col xl={{ span: 12, offset: 3 }}>
                <Card style={{ backgroundColor: '#d9c6a5', width: '35rem', margin: '10px', opacity: '100%' }}>
                  <Card.Header as="h5" style={{ backgroundColor: '#a35d6a' }}>Species- {snake.species}</Card.Header>
                  <Card.Body>
                    <Card.Title>This snakes name is {snake.name}</Card.Title>
                    <Card.Subtitle>Morph- {snake.morph}</Card.Subtitle>
                    <Card.Text>
                      Last Shed Was On <br />{snake.shed}
                    </Card.Text>
                    <Card.Text>
                      Last Feeding Was On <br />{snake.fed}
                    </Card.Text>
                    <React.Fragment>
                      <Button className='btn btn-danger' onClick={() => destroy(snake._id)}>Delete Post</Button>
                      <Link to={`/update-snake/${snake._id}`}>
                        <Button className='btn btn-warning'>Update snake</Button>
                      </Link>
                    </React.Fragment>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    })
    return (
      <div className="">
        <div>
          {snakesToRender}
        </div>
      </div>
    )
  }
}

export default withRouter(Snakes)
