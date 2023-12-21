import { useDispatch } from 'react-redux'
import { deleteComment } from '../features/comments/commentSlice'

function CommentItem({ comment }) {
  const dispatch = useDispatch()

  console.log(comment)

  return (
    <div className='goal'>
      <div>{new Date(comment.createdAt).toLocaleString('en-US')}</div>
      <h2>{comment.description}</h2>
      <button onClick={() => dispatch(deleteComment(comment._id))} className='close'>
        X
      </button>
      
      {/* {comment.isCompleted ? <p> COMPLETED </p> : <p>Not Completed</p>}
       */}
    </div>
  )
}

export default CommentItem
