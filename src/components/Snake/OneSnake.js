import React, { useState, useEffect } from 'react'
import { showSnake } from '../../api/snake'
import { Redirect, Link, withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const OneSnake = ({ msgAlert, user, match }) => {
  const [snake, setSnake] = useState([])
  const [deleted, setDeleted] = useState(false)
  useEffect(() => {
    showSnake(user, snake, match.params.id)
      .then(res => setSnake(res.data.snake))
      .catch(console.error)
  }, [])
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
  if (deleted) {
    return <Redirect to='/snakes' />
  }
  if (snake) {
    return (
      <div className="">
        <div>
          <div key={snake._id}>
            <div className="viewsnake">
              <Container>
                <Row>
                  <Col xl={{ span: 12, offset: 3 }}>
                    <Card style={{ backgroundColor: 'rgb(221, 153, 255)', width: '35rem', margin: '10px', opacity: '100%' }}>
                      <Card.Header as="h5" style={{ backgroundColor: 'rgb(166, 166, 166)' }}>Species - {snake.species}</Card.Header>
                      <Card.Body>
                        <Card.Title>This snakes name is {snake.name}</Card.Title>
                        <Card.Subtitle>Morph - {snake.morph}</Card.Subtitle>
                        <Card.Text>
                          Last Shed Was <br />{snake.shed}
                        </Card.Text>
                        <Card.Text>
                          Last Feeding Was <br />{snake.fed}
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
        </div>
      </div>
    )
  }
}

export default withRouter(OneSnake)
