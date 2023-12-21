import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap'; // Import Bootstrap components
import Spinner from '../components/Spinner';
import { getAllGoals, reset } from '../features/goals/goalSlice';

function AllGoals() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getAllGoals());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Comments Dashboard</p>
      </section>

      <Row xs={1} md={2} lg={3} xl={4} className='g-4'> 
        {goals.length > 0 ? (
          goals.map((goal) => (
            <Col key={goal._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{goal.title}</Card.Title>
                  <Card.Text>{goal.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <h3>There are no goals set</h3>
          </Col>
        )}
      </Row>
    </>
  );
}

export default AllGoals;
