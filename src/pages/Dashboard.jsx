import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import fetchData from '../utils/fetchData';
import deleteData from '../utils/deleteData';

const GOALS_API = '/api/goals'

function Dashboard({ auth0 }) {
  const [goalData, setGoalData] = useState(null);
  // ========= useEffect TO CONTINUOUSLY UPDATE DOM ========= \\
  useEffect(() => {
    handleGetData()
  }, [auth0.isAuthenticated]);

  // ========= GET DATA HANDLER FUNCTION: FETCH DATA FROM API ========= \\
  async function handleGetData() {
    if (!auth0.isAuthenticated) {
      console.log('User is not authenticated.');
      return;
    }
    try {
      const claim = await auth0.getIdTokenClaims();
      if (!claim) {
        console.log('Token claim is undefined.');
        return;
      }
      const token = claim.__raw;
      const response = await fetchData(token, GOALS_API);
      localStorage.setItem('goalData', JSON.stringify(response));
      setGoalData(response);
    } catch (error) {
      console.error('Error fetching data from DB. Received:', error);
    }
  }

  // ========= DELETE DATA HANDLER FUNCTION: FETCH DATA FROM API ========= \\
  async function handleDeleteData(goalId) {
    if (!auth0.isAuthenticated) {
      console.log('User is not authenticated.');
      return;
    }
    try {
      const claim = await auth0.getIdTokenClaims();
      if (!claim) {
        console.log('Token claim is undefined.');
        return;
      }
      const token = claim.__raw;
      const response = await deleteData(token, `${GOALS_API}/${goalId}`);
    } catch (error) {
      console.error('Error fetching data from DB. Received:', error);
    }
  }

  return (
    <>
      <section className='heading'>
        {auth0.isAuthenticated && (
          <>
            <h3>Your Goals Dashboard</h3>
            {
              Array.isArray(goalData) && goalData.map((d) =>
                <ul key={d._id}>
                  <li className='goal-text'>{d.description}</li>
                  <li className='goal-status'><i>{d.status}</i></li>
                  <li className='goal-status'>
                    <Button variant='danger' onClick={() => handleDeleteData(d._id)}>
                      Delete
                    </Button>
                  </li>
                </ul>
              )
            }
            <br />
          </>
        )}
      </section>
      <section className='content'>
        {goalData && goalData.length === 0 && <h3>You have not set any goals</h3>}
      </section>
    </>
  )
}

export default withAuth0(Dashboard)
