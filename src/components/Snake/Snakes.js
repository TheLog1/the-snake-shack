import React, { useState, useEffect } from 'react'
import { viewSnakes } from '../../api/snake'
import { Link, withRouter } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Snakes = ({ msgAlert, user, match }) => {
  const [snakes, setSnakes] = useState([])
  useEffect(() => {
    viewSnakes(user, snakes)
      .then(res => setSnakes(res.data.snakes))
      .catch(console.error)
  }, [])
  let snakesToRender
  if (snakes) {
    snakesToRender = snakes.map(snake => {
      return <div key={snake._id}>
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
                      <Link to={`/show-snake/${snake._id}`}>
                        <Button className='btn btn-submit'>Show snake</Button>
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
