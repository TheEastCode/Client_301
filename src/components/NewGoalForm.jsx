import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import createData from '../utils/createData';

const POST_GOALS = '/api/goals'

function NewGoalForm({ auth0 }) {
    const [text, setText] = useState('')

    async function handlePostData() {
        if (!auth0.isAuthenticated) {
            console.log('User is not authenticated.');
            return;
        }
        try {
            const claim = await auth0.getIdTokenClaims();
            if (!claim) {
                console.log('Token claim is undefined.');
                return;
            }
            const token = claim.__raw;
            await createData(token, POST_GOALS, { "description": text });
            setText('')
        } catch (error) {
            console.error('Error fetching data from DB. Received:', error);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        handlePostData();
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
                    <Button className='btn btn-block' type='submit'>
                        Add Goal
                    </Button>
                </div>
            </form>
        </section>
    )
}

export default NewGoalForm
