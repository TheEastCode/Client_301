import { useState } from 'react'

function NewGoalForm() {
    const [text, setText] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        setText('')
    }

    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='text'>Goal</label>
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
                        Add Goal
                    </button>
                </div>
            </form>
        </section>
    )
}

export default NewGoalForm
