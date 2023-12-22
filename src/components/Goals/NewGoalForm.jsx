import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import createData from '../../utils/createData'

const POST_GOALS = '/api/goals'

function NewGoalForm({ auth0, handleGetData }) {
    const [text, setText] = useState('')
    const [status, setStatus] = useState('Private')
    const [tasks, setTasks] = useState([])
    const [taskInput, setTaskInput] = useState('')

    async function handlePostData() {
        if (!auth0.isAuthenticated) {
            console.log('User is not authenticated.')
            return
        }

        if (text === '') {
            console.log('ERROR: Goal cannot be blank')
            return
        }

        try {
            const claim = await auth0.getIdTokenClaims()
            if (!claim) {
                console.log('Token claim is undefined.')
                return
            }
            const token = claim.__raw
            await createData(token, POST_GOALS, {
                "description": text,
                "status": status,
                "tasks": tasks.map(task => {
                    return {
                        name: task
                    }
                })
            })
            setText('')
            setTasks([])
            handleGetData()
        } catch (error) {
            console.error('Error fetching data from DB. Received:', error)
        }
    }

    const onSelect = (e) => {
        e.preventDefault()
        setStatus(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        handlePostData()
    }

    const onAddTask = (e) => {
        // Check if the key pressed is 'Enter'
        if (e.key === 'Enter') {
            e.preventDefault()
            if (taskInput !== '') {
                setTasks([...tasks, taskInput.trim()])
            }
            setTaskInput('')
            e.placeholder = 'Task Added. Press Add Goal to save'
        }
    }

    return (
        <section className='form'>
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="description">
                    <Form.Label>Goal</Form.Label>
                    <Form.Control
                        name='description'
                        type="text"
                        placeholder="Enter Goal"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="tasks">
                    <Form.Label>Tasks</Form.Label>
                    <Form.Control
                        name='tasks'
                        type="text"
                        placeholder="Enter tasks and press enter to save"
                        value={taskInput}
                        onKeyDown={(e) => onAddTask(e)}
                        onChange={(e) => setTaskInput(e.target.value)}
                    />
                </Form.Group>
                <Form.Check
                    type="radio"
                    id="public"
                    name="status"
                    value="Public"
                    label="Public"
                    onChange={onSelect}
                />
                <Form.Check
                    type="radio"
                    id="private"
                    name="status"
                    value="Private"
                    label="Private"
                    onChange={onSelect}
                />
                <Button className='btn btn-block' type='submit'>
                    Add Goal
                </Button>
            </Form>
        </section>
    )
}

export default NewGoalForm
