// import { useDispatch } from 'react-redux'
// import { deleteGoal } from '../../features/goals/goalSlice'
// import './goal.css';

// function GoalItem({ goal }) {
//   const dispatch = useDispatch()

//   console.log(goal)

//   return (
//     <div className='goal'>
//       <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
//       <h2>{goal.description}</h2>
//       <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
//         X
//       </button>
      
//       {goal.isCompleted ? <p> COMPLETED </p> : <p>Not Completed</p>}
      
//     </div>
//   )
// }

// export default GoalItem
// GoalItem.jsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteGoal } from '../../features/goals/goalSlice';
import { createTask } from '../../features/tasks/taskSlice'; // Import the task creation action


function GoalItem({ goal }) {
  const dispatch = useDispatch();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskText, setTaskText] = useState(''); // State to handle task input

  const onDelete = () => {
    dispatch(deleteGoal(goal._id));
  };

  const onSubmitTask = (e) => {
    e.preventDefault();
    dispatch(createTask({ goalId: goal._id, text: taskText })); // Dispatch action to create a task
    setTaskText('');
  };

  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h2>{goal.description}</h2>
      <button onClick={onDelete} className='close'>
        X
      </button>
      {goal.isCompleted ? <p>COMPLETED</p> : <p>Not Completed</p>}
      <button onClick={() => setShowTaskForm(!showTaskForm)}>
        Add Task
      </button>
      {showTaskForm && (
        <form onSubmit={onSubmitTask}>
          <input
            type='text'
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder='Enter task description'
          />
          <button type='submit'>Submit Task</button>
        </form>
      )}
    </div>
  );
}

export default GoalItem;

