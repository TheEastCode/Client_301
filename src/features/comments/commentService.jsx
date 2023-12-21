import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_URL}/api/comments/`

// Create new comment
const createComment = async (commentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, commentData, config)
  return response.data
}

// Get user comments
const getComments = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

// Delete user comment
const deleteComment = async (commentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL + commentId, config)
  return response.data
}

// ==================== TASKS ================== //

// CREATE NEW TASK
const createTask = async (commentId, taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(`${API_URL}${commentId}/tasks`, taskData, config)
  return response.data
}

// GET TASKS
const getTasks = async (commentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`${API_URL}${commentId}/tasks`, config)
  return response.data
}

// DELETE USER TASK
const deleteTask = async (commentId, taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(`${API_URL}${commentId}/tasks/${taskId}`, config)
  return response.data
}

const commentService = {
  createComment,
  getComments,
  deleteComment,
  getTasks,
  createTask,
  deleteTask
}

export default commentService
