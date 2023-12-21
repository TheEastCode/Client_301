import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createComment } from '../features/comments/commentSlice'

function CommentForm() {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createComment({ text }))
    setText('')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Comment</label>
          <input
            type='text'
            name='description'
            id='description'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Comment
          </button>
        </div>
      </form>
    </section>
  )
}

export default CommentForm
