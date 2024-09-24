import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { CiFaceSmile } from "react-icons/ci";
import { CiFaceMeh } from "react-icons/ci";
import { CiFaceFrown } from "react-icons/ci";
import './App.css'
import { useEffect, useState } from 'react';

function App() {
  let [Feedback, setFeedbak] = useState({});
  let [list, setList] = useState([]);
  let [newcolor, setNewColor] = useState(0);
 useEffect(() => {
  let listData = JSON.parse(localStorage.getItem('feed')) || []; // Fallback to an empty array if null
  setList(listData);
}, [setList]);


  let handleChnage = (e) => {
    let { name, value } = e.target;
    let feed = { ...Feedback, [name]: value };
    setFeedbak(feed)
    console.log(feed)
  }
  let handlesubmit = (e) => {

    e.preventDefault();
    let newList = [...list, Feedback];
    localStorage.setItem('feed', JSON.stringify(newList));
    setList(newList)
    // setStar(0);
    newcolor(0);
    setFeedbak({});

  }
  let delethandle=(i)=>{
    list.splice(i, 1);
    let newList = [...list];
    localStorage.setItem('feed', JSON.stringify(newList));
    setList(newList)
  }
    const faceIcons = [
      { 1: <CiFaceFrown  color="red"  />, value: 1  },  // Frown for rating 1
      { 2: <CiFaceMeh  color="orange" />, value: 2 },    // Meh for rating 2
      { 3: <CiFaceSmile color="green" />, value: 3 }   // Smile for rating 5
    ];
  
    let emojihandle = (val) => {
      setNewColor(val);
      setFeedbak({ ...Feedback, registrationEmoji: val });
    };
  return (
    <>
      <Container className="form-container  ">
        <Row>
          <Col md={8} lg={6}>
            <div className="icon-container text-center mb-4">
            
              <Form className='form-box p-4 border rounded shadow bg-white'>
                <div className='heading'>            <h4 className="text-center mb-2 form-heading">Edit Widget</h4>
                </div>
                <h2>User Registertion Feedback</h2>
                <p> we would be like to  hear your thoughts
                  <br />
                  about your registertion exoreenice.
                </p>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label className='lablef'>First Name: *</Form.Label>
                  <Form.Control type="text" placeholder="Enter your First name" onChange={handleChnage}  name='FirstName' className="form-control-custom" />
                </Form.Group>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label className='lablef'>Last Name: *</Form.Label>
                  <Form.Control type="text" placeholder="Enter your Last name" className="form-control-custom" onChange={handleChnage} name='LastName' />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label className='lablef'>Email Address: *</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" className="form-control-custom" onChange={handleChnage} name='email' />
                </Form.Group>

                <Form.Group controlId="formRepeatPassword" className="mb-3">
                  <Form.Label className='lablef'>Phone Number: *</Form.Label>
                  <Form.Control type="number" placeholder="Repeat your Phone Number" className="form-control-custom " onChange={handleChnage} name='phone' />
                </Form.Group>
                <h3>rate your experian</h3>
                <span>How would you rate your experience with registertion process?</span>
                <Form.Group>
          <Form.Label>Registration Process</Form.Label>
          <div className="d-flex justify-content-between mb-3">
            <CiFaceFrown fontSize={"25px"}
              onMouseOver={() => emojihandle(1)}
              color={newcolor === 1 ? "red" : ""}
             
            />
             <CiFaceMeh fontSize={"25px"}
              onMouseOver={() => emojihandle(2)}
              color={newcolor === 2 ? "yellow" : ""}
              name='registrationEmoji'
             
            />
             <CiFaceSmile fontSize={"25px"}
              onMouseOver={() => emojihandle(3)}
              color={newcolor === 3 ? "green" : ""  }
             
            />
                      </div>
        </Form.Group>
                <Form.Group controlId="formRepeatPassword" className="mb-3">
                  <Form.Label className='lablef'>Feedback: *</Form.Label>
                  <Form.Select placeholder="select option" className="form-control-custom " onChange={handleChnage} name='city'  >
                    <option>Open this select menu</option>
                    <option value="surat">surat</option>
                    <option value="rajasthan">rajasthan</option>
                    <option value="punjab">punjab</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="formRepeatPassword" className="mb-3">
                  <Form.Label className='lablef'>message *</Form.Label>
                  <Form.Control as="textarea" rows={3} className="form-control-custom " name='message' onChange={handleChnage} placeholder='Enter your message'  />
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox" className="mb-4">
                  <Form.Check
                    type="checkbox"
                    label={
                      <span>
                        Check to indicate that you agree to the <a href="#terms" className="text-primary">Terms of Service</a> and <a href="#privacy" className="text-primary">Privacy Policy</a>.
                      </span>
                    }
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="success" size="lg" type="submit" className="form-submit-btn" onClick={handlesubmit}>
                    submit
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <table className="table table-success table-striped" border={1} align='center'  >
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email </th>
            <th scope="col">Phone Number</th>
            <th scope="col">Feedback</th>
            <th scope="col">City</th>
            <th>Feedback</th>
            <th scope="col">action</th>

            
          </tr>
        </thead>
        <tbody>
          {
            list.map((val, i) => (
              <tr key={i}>
                <td>{val.FirstName}</td>
                <td>{val.LastName}</td>
                <td>{val.email}</td>
                <td>{val.phone}</td>
                <td>{val.message}</td>
                <td>{val.city}</td>
                           <td><button onClick={()=>delethandle(i)}>Delet</button></td>

                <td>
                {
  faceIcons.find((face) => Object.keys(face)[0] == val.registrationEmoji)?.[val.registrationEmoji] || "N/A"
}

            </td>
              </tr>
            ))
          }

        </tbody>
      </table>
    </>

  )
}

export default App
