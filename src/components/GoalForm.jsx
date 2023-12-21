import { Button } from 'react-bootstrap';
import { useState } from 'react'
// import { createData } from '../utils/createData'

function GoalForm() {
  const [text, setText] = useState('')

  // Example usage in an async function
  const handleCreateGoal = async (goalTitle, goalDescription) => {
    const token = 'your-auth-token'; // Replace with actual token retrieval logic
    const path = '/goals'; // Adjust if your API endpoint is different
    const goalData = {
      title: goalTitle,
      description: goalDescription
      // Add other goal properties here if needed
    };

    try {
      // const newGoal = await createData(token, path, goalData);
      console.log('Goal created: newGoal');
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault()
    handleCreateGoal(text)
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='description'>Goal</label>
          <input
            type='text'
            name='description'
            id='description'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <Button className='btn btn-block'>
            Add Goal
          </Button>
        </div>
      </form>
    </section>
  )
}

export default GoalForm
