import React, { useState, useEffect } from 'react';
import createData from '../utils/createData';
import fetchData from '../utils/fetchData';
import { withAuth0 } from '@auth0/auth0-react';
// import deleteData from '../utils/deleteData'

const API_URL = `${import.meta.env.VITE_SERVER_URL}`;

// Comments.jsx
const Comments = ({ auth0 }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  // Fetch comments initially and when dependencies change

  const postComment = async (path, body, userId) => {
    const claim = await auth0.getIdTokenClaims()
    if (!claim) {
      console.log('Token claim is undefined.')
      return
    }
    try {
      const token = claim.__raw
      const response = await createData(token, path, body, userId)
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    const getComments = async () => {
      const claim = await auth0.getIdTokenClaims()
      if (!claim) {
        console.log('Token claim is undefined.')
        return
      }
      try {
        const token = claim.__raw
        const response = await fetchData(token, `/api/comments`)
        return response
      } catch (error) {
        console.log(error)
      }
    }

    const loadComments = async () => {
      const fetchedComments = await getComments();
      setComments(fetchedComments);
    };
    if (auth0.isAuthenticated) {
      loadComments();
    }
  }, []);


  // Handle new comment submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const postedComment = await postComment(
      `/api/comments`,
      { text: newComment }
    )

    if (postedComment) {
      setComments([...comments, postedComment])
      setNewComment('')
    }
  }
  return (
    <div>
      <h3>Comments</h3>
      {auth0.isAuthenticated ? (
        <form onSubmit={handleSubmit}>
          <textarea
            name='text'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
          ></textarea>
          <button type="submit">Post Comment</button>
        </form>
      ) : (
        <p>Please log in to post comments.</p>
      )}
      <div>
        {comments && comments.map((comment) => (
          <div key={comment._id}>
            <p>{comment.createdAt}</p>
            <p>{comment.user.nickname}</p>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Comments;