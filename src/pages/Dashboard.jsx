import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import AuthButtons from '../Auth/AuthButtons.jsx';
import fetchData from '../utils/getData'
const FETCH_PATH = '/api/goals'

function Dashboard({ auth0 }) {
  const [userData, setUserData] = useState(null);

  async function handleGetData() {
    if (!auth0.isAuthenticated) {
      console.log('User is not authenticated.');
      return;
    }
    try {
      let claim = await auth0.getIdTokenClaims();
      if (!claim) {
        console.log('Token claim is undefined.');
        return;
      }
      let token = claim.__raw;
      let response = await fetchData(token, FETCH_PATH);
      setUserData(response)
      console.log(response)
    } catch (error) {
      console.error('Error fetching data from DB. Received:', error);
    }
  }

  useEffect(() => {
    if (auth0.isAuthenticated) {
      handleGetData();
    }
  }, [auth0.isAuthenticated]);

  return (
    <>
      {/* AUTHBUTTON FOR AUTH0 LOGIN */}
      <AuthButtons />

      <section className='heading'>
        {userData ? <h1>Welcome {userData.name}</h1> : <h1>Welcome To GoalEase</h1>}
        {auth0.isAuthenticated && <h3>Goals Dashboard</h3>}
        {auth0.isAuthenticated && <Button variant='success' onClick={handleGetData}>Get Your Goals</Button>}

        {
          Array.isArray(userData) && userData.map((d, idx) => {
            return <p key={d._id}> {d.description} </p>
          })
        }
      </section>

      <section className='content'>
        {userData && userData.length === 0 && <h3>You have not set any goals</h3>}
      </section>
    </>
  )
}

export default withAuth0(Dashboard)
