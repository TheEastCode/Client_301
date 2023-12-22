import { useState, useEffect } from 'react'
import { Button, Card, Col, Row, Modal } from 'react-bootstrap'
import { withAuth0 } from '@auth0/auth0-react'
import fetchData from '../utils/fetchData'
import deleteData from '../utils/deleteData'
import NewGoalForm from '../components/Goals/NewGoalForm'

const GOALS_API = '/api/goals'

function Dashboard({ auth0 }) {
  const [goalData, setGoalData] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState(null)

  const handleShowGoalModal = () => {
    setShowModal(true)
  };

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedGoal(null)
  };

  const handleAddTask = (goal) => {
    setSelectedGoal(goal)
    setShowModal(true)
  }

  // ========= GET DATA HANDLER FUNCTION: FETCH DATA FROM API ========= \\
  async function handleGetData() {
    if (!auth0.isAuthenticated) {
      console.log('User is not authenticated.')
      return
    }
    try {
      const claim = await auth0.getIdTokenClaims()
      if (!claim) {
        console.log('Token claim is undefined.')
        return
      }
      const token = claim.__raw
      const response = await fetchData(token, GOALS_API)
      localStorage.setItem('goalData', JSON.stringify(response))
      setGoalData(response)
    } catch (error) {
      console.error('Error fetching data from DB. Received:', error)
    }
  }

  // ========= DELETE DATA HANDLER FUNCTION: FETCH DATA FROM API ========= \\
  async function handleDeleteData(goalId) {
    if (!auth0.isAuthenticated) {
      console.log('User is not authenticated.')
      return
    }
    try {
      const claim = await auth0.getIdTokenClaims()
      if (!claim) {
        console.log('Token claim is undefined.')
        return
      }
      const token = claim.__raw
      const response = await deleteData(token, `${GOALS_API}/${goalId}`)

      if (response.status === 200) {
        const updatedGoals = goalData.filter((goal) => goal._id !== goalId)
        setGoalData(updatedGoals)
      }
    } catch (error) {
      console.error('Error fetching data from DB. Received:', error)
    }
  }

  const getMappedData = (arr = []) => {
    if (arr && arr.length !== 0) {
      return arr.map(a => {
        return (<li key={a._id}>{a.name}</li>)
      })
    }
  }

  // ========= useEffect TO CONTINUOUSLY UPDATE DOM ========= \\
  useEffect(() => {
    handleGetData()
  }, [auth0.isAuthenticated])

  return (
    <>
      {auth0.isAuthenticated && (
        <div className='dashboard'>
          {/* ----- */}

          <div className='sidebar shadow-lg'>
            {/* Left side navigation */}
            <div className='sidebar-header'>
              <h3>Welcome {auth0.user.nickname}</h3>
            </div>
            <nav className='sidebar-nav'>
              <ul>
                {/* Navigation links */}
                <li>
                  <a href='#' onClick={handleShowGoalModal}>
                    Add New Goal
                  </a>
                </li>
                <li>
                  <a href='#'>Add Comment</a>
                </li>
                <li>
                  <a href='#'>Play Snake</a>
                </li>
              </ul>
            </nav>
          </div>

          <main className='main-content'>
            <header className='header'>
              {/* My header content here */}
              <h1 className='mydash'>My Dashboard</h1>
              <Button variant="outline-primary" className='custom-button' onClick={handleShowGoalModal}>
                Add Goal
              </Button>
            </header>

            <section className='heading'>
              {/* DISPLAY GOALS */}
              <Row xs={1} md={1} lg={2} xl={3} className='g-4 shadow-md'>
                {goalData && goalData.map((goal, idx) => (
                  <Col key={idx} >
                    <Card style={{ width: '20rem' }}>
                      <Card.Img variant='top' src={goal.user.picture} />
                      <Card.Body>
                        <Card.Title>{goal.description}</Card.Title>
                        <Card.Text> {goal.tasks ? getMappedData(goal.tasks) : null}
                        </Card.Text>
                        {/* Button to add tasks */}
                        <Button
                          variant='secondary button-secondary'
                          onClick={() => handleAddTask(goal)}
                        >
                          Add Task
                        </Button>
                        <Button
                          variant='danger button-secondary'
                          onClick={() => handleDeleteData(goal._id)}
                        >
                          Delete Goal
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
                <NewGoalForm
                  auth0={auth0}
                  handleGetData={handleGetData}
                  handleDeleteData={handleDeleteData}
                />
              </Modal.Body>
            </Modal>
          </main>

          {/* --- EKOW'S ORIGINAL MARKUP STARTS HERE --- */}
          {/* <section className='heading'>
            {
              Array.isArray(goalData) && goalData.map((d) =>
                <ul key={d._id}>
                  <li className='goal-text'>{d.description}</li>
                  <li className='goal-status'><i>{d.status}</i></li>
                  <li className='goal-status'>
                    <ButtonGroup aria-label="Basic example">
                      <Button variant='danger' onClick={() => handleDeleteData(d._id)}>
                        Delete
                      </Button>
                      <Button variant='success'>
                        Mark Complete
                      </Button>
                    </ButtonGroup>
                  </li>
                </ul>
              )
            }
            <br />
          </section>
          <section className='content'>
            {goalData && goalData.length === 0 && <h3>You have not set any goals</h3>}
          </section> */}

        </div>)}
    </>
  )
}

export default withAuth0(Dashboard)
