import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

const Landing = (props) => {
  const userView = {
    color: 'purple',
    display: 'flex',
    justifyContent: 'center'
  }
  const imgView = {
    display: 'flex',
    justifyContent: 'center'
  }

  return (
    <Container fluid='md'>
      <Row>
        <Col md={12}>
          <div style={userView}>
            <h1>WELCOME TO THE SNAKE SHACK!</h1>
          </div>
        </Col>
        <Col>
          <div style={imgView}>
            <img src="https://i.imgur.com/6PhnaJuh.jpg" title="source: imgur.com" />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Landing
