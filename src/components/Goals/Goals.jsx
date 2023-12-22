import { useState, useEffect } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import GoalModal from './GoalModal'
import AddTaskModal from './AddTaskModal'

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

    const handleAddTask = () => {
        setShowAddTask(true)
    }

    const handleCloseAddTaskModal = () => {
        setShowAddTask(false)
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
                <Row xs={1} md={1} lg={2} xl={3} className='g-4 shadow-md'>
                    {goalData && goalData.map((goal, idx) => (
                        <>
                            <Col key={idx} >
                                <Card style={{ width: '20rem' }}>
                                    <Card.Img variant='top' src={goal.user.picture} />
                                    <Card.Body>
                                        <i>{new Date(goal.createdAt).toLocaleString('en-US')}</i>
                                        <Card.Title>{goal.description}</Card.Title>
                                        <Card.Text> {goal.tasks ? getMappedData(goal.tasks) : null}
                                        </Card.Text>
                                        {/* Button to add tasks */}
                                        <Button
                                            variant='secondary button-secondary'
                                            onClick={(e) => handleAddTask()}
                                        >
                                            Add Task
                                        </Button>
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