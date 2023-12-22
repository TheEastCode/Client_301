import { Component } from "react";
import Card from 'react-bootstrap/Card';

class About extends Component {

  render() {
    
    return (

<>
<h1 style={{ textAlign: 'center' }}>Meet our Team</h1>

<div 
  style={{
    display:"flex",
    justifyContent:"center",
    gap: "1em"
}}>
<Card border="secondary" style={{ width: '18rem', marginBottom: '10px' }}>
      <Card.Body>
        <Card.Title>Ekow Yawson</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Back-End</Card.Subtitle>
        <Card.Text>
        I am a highly skilled professional software developer with a proven track record in full-stack web development, application development, and systems engineering. My proficiency extends to JavaScript, Python, BASH scripting, and SQL. Currently residing in Maryland, near Baltimore, I have had the pleasure of indulging in the best seafood America has to offer.

        </Card.Text>
        <Card.Link href="https://github.com/ekowyawson">GitHub</Card.Link>
        <Card.Link href="https://www.linkedin.com/in/ekowyawson71/">LinkedIn</Card.Link>
      </Card.Body>
    </Card>
    <Card border="danger" style={{ width: '18rem', marginBottom: '10px' }}>
      <Card.Body>
        <Card.Title>Stephanie G. Johnson</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Front-End</Card.Subtitle>
        <Card.Text>
        I'm Steph- an attorney, diving into full-stack software development to launch a startup merging law and tech.
        </Card.Text>
        <Card.Link href="https://github.com/f-taveras">GitHub</Card.Link>
        <Card.Link href="https://www.linkedin.com/in/f-taveras">LinkedIn</Card.Link>
      </Card.Body>
    </Card>
    <Card border="secondary" style={{ width: '18rem', marginBottom: '10px' }}>
      <Card.Body>
        <Card.Title>Latherio Kidd</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Back-End</Card.Subtitle>
        <Card.Text>
        example text

        </Card.Text>
        <Card.Link href="https://github.com/ekowyawson">GitHub</Card.Link>
        <Card.Link href="https://www.linkedin.com/in/ekowyawson71/">LinkedIn</Card.Link>
      </Card.Body>
    </Card>
    <Card border="secondary" style={{ width: '18rem', marginBottom: '10px' }}>
      <Card.Body>
        <Card.Title>David Grier-Johnson</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Back-End</Card.Subtitle>
        <Card.Text>
        Unfortunatelly, David had a medical impediment and we are all wishing for him to get better

        </Card.Text>
        <Card.Link href="https://github.com/ekowyawson">GitHub</Card.Link>
        <Card.Link href="https://www.linkedin.com/in/ekowyawson71/">LinkedIn</Card.Link>
      </Card.Body>
    </Card>
     </div>
    </>

    )
  }
}

export default About;
