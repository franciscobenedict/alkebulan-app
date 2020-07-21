import React, { useState, useContext } from "react";
import { AuthContext } from "../../App";
import * as firebase from "firebase";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");
  const Auth = useContext(AuthContext);
  const handleForm = e => {
    e.preventDefault();
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log('res', res);
          if (res.user) {
            Auth.setLoggedIn(true);
            // history.push('/');
            window.location.href="/"
          }
        })
        .catch(e => {
          setErrors(e.message);
        });
      })
  };
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          console.log('result', result);
          Auth.setLoggedIn(true);
          // history.push('/');
          window.location.href="/"
        })
        .catch(e => setErrors(e.message))
      })
  }

  return (
    <div className="modali-container">
      <hr className="hr_grey"/>
      <div className="modali-body">
        <form className="form_styles" onSubmit={e => handleForm(e)} autoComplete="off">
          <div className="form__input_group__email_password">
            {/* Email */}
            <div className="form_input email_input cursor">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                name="email"
                type="email"
                autoComplete="none"
              />
              <i></i>
              <span>Enter a valid email address</span>
            </div>

            {/* Password */}
            <div className="form_input password_input cursor">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                name="password"
                type="password"
                autoComplete="none"
              />
              <i></i>
              <span>Enter your password</span>
            </div>
          </div>

          {/* Login button */}
          <button className="button form_button" type="submit">
            <div className="button_text flex_align_center">
              <span className="aligned_element">Login</span>
            </div>
          </button>
          { error && <div className="error_block">{error}</div> }

          <hr className="hr_grey"/>

          {/* Google login button */}
          <button onClick={() => signInWithGoogle()} className="button form_button flex_align_center" type="button">
            <div className="button_text flex_align_center">
              <span className="aligned_element">Login With Google</span>
            </div>
            <span className="button_divider"></span>
            <div className="button_image flex_align_center">
              <img className="googleBtn aligned_element"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="logo"
              />
            </div>
          </button>
        </form>
      </div>
      <div className="modali-footer"></div>
    </div>
  );
};

export default LoginModal;
