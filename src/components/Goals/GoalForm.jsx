// import { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { createGoal } from '../features/goals/goalSlice'

// function GoalForm() {
//   const [text, setText] = useState('')

//   const dispatch = useDispatch()

//   const onSubmit = (e) => {
//     e.preventDefault()
//     dispatch(createGoal({ text }))
//     setText('')
//   }

//   return (
//     <section className='form'>
//       <form onSubmit={onSubmit}>
//         <div className='form-group'>
//           <label htmlFor='text'>Goal</label>
//           <input
//             type='text'
//             name='description'
//             id='description'
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//           />
//         </div>
//         <div className='form-group'>
//           <button className='btn btn-block' type='submit'>
//             Add Goal
//           </button>
//         </div>
//       </form>
//     </section>
//   )
// }

// export default GoalForm

// GoalForm.jsx

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createGoal } from '../../features/goals/goalSlice';


function GoalForm() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState([]);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const newGoal = { text, tasks };
    dispatch(createGoal(newGoal));
    setText('');
    setTasks([]);
  };

  const handleAddTask = () => {
    // Add a new task input field
    setTasks([...tasks, '']);
  };

  const handleTaskChange = (index, value) => {
    // Update the tasks array when a task input changes
    const updatedTasks = [...tasks];
    updatedTasks[index] = value;
    setTasks(updatedTasks);
  };

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
        {tasks.map((task, index) => (
          <div key={index} className='form-group'>
            <label htmlFor={`task${index + 1}`}>Task {index + 1}</label>
            <input
              type='text'
              name={`task${index + 1}`}
              id={`task${index + 1}`}
              value={task}
              onChange={(e) => handleTaskChange(index, e.target.value)}
            />
          </div>
        ))}
        <div className='form-group'>
          <button className='btn btn-block' type='button' onClick={handleAddTask}>
            Add Task
          </button>
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;
