import React , { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import firebaseConfig from "../../store/base";

const STATE_KEY = `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`;
const sessionStorage = window.sessionStorage.getItem(STATE_KEY);

const LandingView = ({history}) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  console.log('Landing view');
  console.log('sessionStorage', JSON.parse(sessionStorage));

  function readSession() {
    const user = sessionStorage;
    if (user) setLoggedIn(true);
  }

  useEffect(() => {
    readSession()
  }, []);

  console.log('isLoggedIn', isLoggedIn);

  return (
    <div className="main">
    <p>This is the landing view page</p>
    </div>
  )
}

export default withRouter(LandingView);
