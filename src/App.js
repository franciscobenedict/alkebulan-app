import React, { useState, useEffect }             from 'react';
import * as firebase                              from "firebase";
import firebaseConfig                             from "./store/base";
import ProtectedRouteHoc                          from './store/ProtectedRouteHoc';
import protectedRoutes                            from './store/protectedRoutes';
import routes                                     from "./store/routes";
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ErrorView                                  from './components/ErrorView';
import NavBarMenu                                 from './components/NavBarMenu/NavBarMenu';

firebase.initializeApp(firebaseConfig);
const STATE_KEY = `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`;
const sessionStorage = window.sessionStorage.getItem(STATE_KEY);

export const AuthContext = React.createContext(null);

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  function readSession() {
    const user = sessionStorage;
		if (user) setLoggedIn(true);
  }

  useEffect(() => {
    readSession()
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      <Router>
        <NavBarMenu />
        <Switch>
          {protectedRoutes.map(route => (
            <ProtectedRouteHoc
              key={route.path}
              isLoggedIn={isLoggedIn}
              path={route.path}
              component={route.main}
              exact={route.exact}
              public={route.public}
            />
          ))}

          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
          <Route component={ErrorView}/>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
