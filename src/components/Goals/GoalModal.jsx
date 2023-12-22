import React from 'react'
import { Modal } from 'react-bootstrap'
import NewGoalForm from './NewGoalForm'

function GoalModal({ showModal, handleCloseModal, selectedGoal, auth0, handleGetData, handleDeleteData }) {
    return (
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
    )
}

export default GoalModal