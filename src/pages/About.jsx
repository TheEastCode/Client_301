import React from 'react'
import { Button, Card, Col, Row, Modal } from 'react-bootstrap'
import { withAuth0 } from '@auth0/auth0-react'
import SideBar from '../components/SideBar'

function About({ auth0 }) {
    return (
        <>
            {auth0.isAuthenticated && (
                <div className='dashboard'>
                    <SideBar auth0={auth0} handleShowGoalModal={handleShowGoalModal} />
                </div>
            )}
        </>
    )
}

export default withAuth0(About)
