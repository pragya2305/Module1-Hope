import React, { useState,useEffect } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import './Letter.css'
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { refreshTokenSetup } from '../../utils/refreshToken';
import { Modal, Button } from 'react-bootstrap';
import { GoogleLogin } from 'react-google-login';
import {useLocation } from 'react-router-dom';
const clientId =
  '23157659159-k7of2mgt1a7ipa1hbpjqt7nnajf44d72.apps.googleusercontent.com';
function Letter({ loggedIn,onLogin,user,setUser,userHelp,setUserHelp }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const location = useLocation();

 const onSuccess = async (res) => {
      onLogin(true);
      setUser({
          email: res.profileObj.email,
          familyName: res.profileObj.familyName,
          givenName: res.profileObj.givenName,
          googleId: res.profileObj.googleId,
          imageUrl: res.profileObj.imageUrl,
          name: res.profileObj.name
      });
      console.log('login', user, res)
   refreshTokenSetup(res);
   handleClose();
  };

const onFailure = (res) => {
  handleClose();
  alert('Google Sign In was unsuccessful. Try again later');
};


const [letter, setletter] = useState({
  let: '',
});
const createletter = () => {
    
  if (loggedIn) {
   
    axios.post('http://localhost:5000/letter', letter);
    console.log(`Exercise submitted: `,letter,user.name,user.email);
    setletter({
      let: '',
    });
    //alert(`thank you for your answers`);//very annoying
    
  } else {
    handleShow();
  }
}



  
  return (
     
    <div className="letter-main" id='letter'>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign in Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please Sign in before submitting</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <GoogleLogin
            clientId={clientId}
            render={renderProps => (
              <Button variant="contained" color="primary" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                Sign In
              </Button>)}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            style={{ marginTop: '100px' }}
            isSignedIn={true}
          />
        </Modal.Footer>
      </Modal>
      <div className='letter-cont'>
        <h2>My Gratitude Letter</h2>
        <div style={{
                    textAlign:'center',
                    fontSize: 'medium',
                    fontWeight:'500',
                    paddingBottom: '20px',
                    paddingLeft: '75px',
                    paddingRight: '75px'
                }}><u>Instructions:</u> In this activity, you will write a letter in the space provided below as short or long as you want to the person who you are thankful for. It could be a friend, family member, partner, mentor, colleague or even your pet. Write about why you are thankful for them and how or in what way have they positively impacted your life.
          </div>
        <div className='letter-text'>

          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon">
                <i className="fas fa-pencil-alt prefix"></i>
              </span>
            </div>
              
            <TextareaAutosize
              autoFocus
              minRows='15'
              style={{ width: '90%' }}
              placeholder="Write your Letter here"
              id="outlined-full-width"
         
              value={letter.let}
              onChange={(event) => {
                setletter({ ...letter, let: event.target.value })
              }}
            />
          </div>
          <div className="Submit-btn">
            <button type="submit" onClick={createletter} className='primary' style={{ marginRight: '57%' }}>
              Submit
                        </button>
                    
          </div>
        </div>
      </div>
    </div>
  );
}

export default Letter