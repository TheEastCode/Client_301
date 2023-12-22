import { useState, useEffect } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import GoalModal from './GoalModal'
import AddTaskModal from './AddTaskModal'
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_SERVER_URL}`;

function Goals({
    showModal,
    setShowModal,
    auth0,
    handleGetData,
    handleDeleteData,
    getMappedData,
    goalData
}) {
    const [selectedGoal, setSelectedGoal] = useState(null)
    const [showAddTask, setShowAddTask] = useState(null)

    const handleCloseModal = () => {
        setShowModal(false)
        setSelectedGoal(null)
    };

    const handleShowGoalModal = () => {
        setShowModal(true)
    };

    const handleAddTask = (e) => {
        setShowAddTask(true)
    }

    const handleCloseAddTaskModal = () => {
        setShowAddTask(false)
    }

    const updateData = async (path, body) => {
        try {
            const claim = await auth0.getIdTokenClaims()
            if (!claim) {
                console.log('Token claim is undefined.')
                return
            }
            const token = claim.__raw
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const response = await axios.put(`${API_URL}${path}`, body, config);
            return response
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const handleMarkComplete = async (e, goalId, description, status, isCompleted = false) => {

        try {
            let data = {
                _id: goalId,
                description: description,
                status: status,
                isCompleted: isCompleted
            }
            const res = await updateData(`/api/goals/${goalId}`, data)
            e.target.classList.replace('btn-warning', 'btn-success')
        } catch (error) {
            console.error('Error updating data in DB. Received:', error)
        }

    }

    return (
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
                <Row xs={3} md={3} lg={3} xl={3} className='g-4 shadow-md'>
                    {goalData && goalData.map((goal, idx) => (
                        <>
                            <Col key={goal._id} >
                                <Card style={{ width: '20rem' }}>
                                    <Card.Img variant='top' src={goal.user.picture} />
                                    <Card.Body>
                                        <i>{new Date(goal.createdAt).toLocaleString('en-US')}</i>
                                        <Card.Title>{goal.description}</Card.Title>
                                        <Card.Text> {goal.tasks ? getMappedData(goal.tasks) : null}
                                        </Card.Text>
                                        {/* Button to add tasks */}

                                        {goal.isCompleted ?
                                            <Button variant='success'>
                                                Complete!
                                            </Button>
                                            :
                                            <Button variant='warning'
                                                onClick={(e) => handleMarkComplete(e,
                                                    goal._id,
                                                    goal.description,
                                                    goal.status,
                                                    true
                                                )}>
                                                Mark Complete
                                            </Button>
                                        }
                                        &nbsp;
                                        <Button
                                            variant='danger button-secondary'
                                            onClick={() => handleDeleteData(goal._id)}
                                        >
                                            Delete Goal
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <AddTaskModal
                                handleCloseAddTaskModal={handleCloseAddTaskModal}
                                showModal={showAddTask}
                                selectedGoal={selectedGoal}
                                auth0={auth0}
                                handleGetData={handleGetData}
                                handleDeleteData={handleDeleteData}
                                goal={goal}
                            />
                        </>
                    ))}
                </Row>
            </section>


            <GoalModal
                handleCloseModal={handleCloseModal}
                showModal={showModal}
                selectedGoal={selectedGoal}
                auth0={auth0}
                handleGetData={handleGetData}
                handleDeleteData={handleDeleteData}
            />
        </main>
    )
}

export default Goals