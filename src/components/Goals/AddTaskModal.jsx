import React from 'react'
import { Modal } from 'react-bootstrap'
import AddTaskForm from './AddTaskForm'

function AddTaskModal({ goal, showModal, handleCloseAddTaskModal, selectedGoal, auth0, handleGetData, handleDeleteData }) {
    return (
        <Modal show={showModal} onHide={handleCloseAddTaskModal}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {selectedGoal ? 'Add Task' : 'Add Goal'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Pass necessary props to GoalForm */}
                <AddTaskForm
                    auth0={auth0}
                    handleGetData={handleGetData}
                    handleDeleteData={handleDeleteData}
                    handleCloseAddTaskModal={handleCloseAddTaskModal}
                    goal={goal}
                />
            </Modal.Body>
        </Modal>
    )
}

export default AddTaskModal