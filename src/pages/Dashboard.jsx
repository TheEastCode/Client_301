// import React, { useState, useEffect } from 'react';
// import { Button } from 'react-bootstrap';
// import { withAuth0 } from '@auth0/auth0-react';
// import fetchData from '../utils/getData';

// function Dashboard({ auth0 }) {
//   const [userData, setUserData] = useState(null);

//   async function handleGetData() {
//     try {
//       if (!auth0.isAuthenticated) {
//         console.log('User is not authenticated.');
//         // return;
//       }

//       let claim = await auth0.getIdTokenClaims();
//       if (!claim) {
//         console.log('Token claim is undefined.');
//         // return;
//       }

//       let token = claim.__raw;
//       let response = await fetchData(token, '/api/goals/dashboard');
//       setUserData(response);

//     } catch (error) {
//       console.error('Error fetching:', error);
//     }
//   }

//   useEffect(() => {
//     // if (auth0.isAuthenticated) {
//       handleGetData();
//     // }
//   }, [auth0.isAuthenticated]);

//   return (
//     <>
//       <section className='heading'>
//         {userData && <h1>Welcome {userData.name}</h1>}
//         <h3>Goals Dashboard</h3>
//         <Button variant='success' onClick={handleGetData}>Get Your Goals</Button>

//         {
//           userData && Array.isArray(userData) && userData.map((d, idx) => {
//             return <p key={d._id}> {d.description} </p>
//           })
//         }
//       </section>

//       <section className='content'>
//         {userData && userData.length === 0 && <h3>You have not set any goals</h3>}
//       </section>
//     </>
//   )
// }

// export default withAuth0(Dashboard)

import React, { useState } from 'react';
import GoalForm from '../components/Goals/GoalForm';
import { Button, Card, Col, Row, Modal } from 'react-bootstrap';
import '../../src/index.css';



function Dashboard() {
  const [userData, setUserData] = useState([
    {
      nickname: 'Happy',
      name: 'happy@example.com',
      picture:
        'public/mountains.jpg',
      updated_at: '2023-12-20T18:30:03.315Z',
      email: 'happy@example.com',
      description: 'Working on being cheerful all day!',
      user: '111111111111111111111',
    },
    {
      nickname: 'Grumpy',
      name: 'grumpy@example.com',
      picture:
        'public/mountains.jpg',
      updated_at: '2023-12-21T10:30:00.000Z',
      email: 'grumpy@example.com',
      description: 'Complaining about everything!',
      user: '222222222222222222222',
    },
    {
      nickname: 'Sleepy',
      name: 'sleepy@example.com',
      picture:
        'public/mountains.jpg',
      updated_at: '2023-12-22T08:00:00.000Z',
      email: 'sleepy@example.com',
      description: 'Need more sleep...',
      user: '333333333333333333333',
    },
    {
      nickname: 'Bashful',
      name: 'bashful@example.com',
      picture:
        'public/mountains.jpg',
      updated_at: '2023-12-23T15:45:00.000Z',
      email: 'bashful@example.com',
      description: 'Shy and reserved, but working on it!',
      user: '444444444444444444444',
    },
    {
      nickname: 'Sneezy',
      name: 'sneezy@example.com',
      picture:
        'public/mountains.jpg',
      updated_at: '2023-12-24T12:20:00.000Z',
      email: 'sneezy@example.com',
      description: 'Constantly dealing with allergies!',
      user: '555555555555555555555',
    },
    {
      nickname: 'Dopey',
      name: 'dopey@example.com',
      picture:
        'public/mountains.jpg',
      updated_at: '2023-12-25T09:10:00.000Z',
      email: 'dopey@example.com',
      description: 'Clumsy but always trying!',
      user: '666666666666666666666',
    },
    {
      nickname: 'Doc',
      name: 'doc@example.com',
      picture:
        'public/mountains.jpg',
      updated_at: '2023-12-26T11:30:00.000Z',
      email: 'doc@example.com',
      description: 'The wise one in the group!',
      user: '777777777777777777777',
    },
    
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const handleAddGoal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedGoal(null);
  };

  const handleAddTask = (goal) => {
    setSelectedGoal(goal);
    setShowModal(true);
  };

  const userName = 'User';

  return (
    <div className='dashboard'>

      <div className='sidebar shadow-lg'>
        {/* Left side navigation */}
        <div className='sidebar-header'>
          <h3>Welcome {userName}</h3>
        </div>
        <nav className='sidebar-nav'>
          <ul>
            {/* Navigation links */}
            <li>
              <a href='#' onClick={handleAddGoal}>
                Make A New Goal
              </a>
            </li>
            <li>
              <a href='#'>Play Snake Game</a>
            </li>
            <li>
              <a href='#'>Make A Public Comment</a>
            </li>
          </ul>
        </nav>
      </div>
    
      <main className='main-content'>
        <header className='header'>
          {/* My header content here */}
          <h1 className='mydash'>My Dashboard</h1>
          <Button variant="outline-primary" onClick={handleAddGoal}>
            Add Goal
          </Button>
        </header>

        <section className='heading'>
    
          <Row xs={1} md={1} lg={3} className='g-4 shadow-md'>
            {userData.map((goal, idx) => (
              <Col key={idx}>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant='top' src={goal.picture} />
                  <Card.Body>
                    <Card.Title>{goal.nickname}</Card.Title>
                    <Card.Text>{goal.description}</Card.Text>
                    {/* Button to add tasks */}
                    <Button
                      variant='secondary button-secondary'
                      onClick={() => handleAddTask(goal)}
                    >
                      Add Task
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Modal for adding goals and tasks */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedGoal ? 'Add Task' : 'Add Goal'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Pass necessary props to GoalForm */}
            <GoalForm
              closeModal={handleCloseModal}
              selectedGoal={selectedGoal}
            />
          </Modal.Body>
  
        </Modal>
      </main>
    </div>
  );
}

export default Dashboard;