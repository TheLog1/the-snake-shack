import apiUrl from '../apiConfig'
import axios from 'axios'
// import { withRouter } from 'react-router-dom'

export const createSnake = (user, snake) => {
  return axios({
    url: apiUrl + '/snakes',
    method: 'POST',
    data: { snake },
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const viewSnakes = (user, snake) => {
  return axios({
    url: apiUrl + '/snakes',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const showSnake = (user, snake, id) => {
  return axios({
    url: apiUrl + `/snakes/${id}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const updateSnake = (user, snake, id) => {
  return axios({
    url: `${apiUrl}/snakes/${id}`,
    method: 'PATCH',
    data: { snake },
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
