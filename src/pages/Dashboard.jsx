import { useState, useEffect } from 'react'
import { Button, Card, Col, Row, Modal } from 'react-bootstrap'
import { withAuth0 } from '@auth0/auth0-react'
import fetchData from '../utils/fetchData'
import deleteData from '../utils/deleteData'
import Goals from '../components/Goals/Goals'
import SideBar from '../components/SideBar'

const GOALS_API = '/api/goals'

function Dashboard({ auth0 }) {
  const [goalData, setGoalData] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const handleShowGoalModal = () => {
    setShowModal(true)
  };

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
        return (<p key={a._id}>{a.name}</p>)
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
          <SideBar auth0={auth0} handleShowGoalModal={handleShowGoalModal} />

          <Goals
            showModal={showModal}
            setShowModal={setShowModal}
            auth0={auth0}
            handleGetData={handleGetData}
            handleDeleteData={handleDeleteData}
            getMappedData={getMappedData}
            goalData={goalData}
          />
        </div>
      )}
    </>
  )
}

export default withAuth0(Dashboard)
