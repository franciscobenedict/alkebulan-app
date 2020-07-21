import React, { useState, useContext } from "react";
import { AuthContext } from "../../App";
import * as firebase from "firebase";
import '../../thirdparty/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RegisterModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");
  const [confirmPassword, setComparePassword] = useState("");
  let passwordMatch = null;
  let charNumberValid = null;
  let specialCharValid = null;
  let numberValid = null;
  let uppercaseValid = null;
  let lowercaseValid = null;
  let checkValid = null;
  const Auth = useContext(AuthContext);
  const handleForm = e => {
    e.preventDefault();
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          console.log(res)
          // history.push('/reports')
          // if (res.user) Auth.setLoggedIn(true);
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
  const handleGoogleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        console.log(result);
        Auth.setLoggedIn(true);
        // history.push('/');
        window.location.href="/"
      })
      .catch(e => setErrors(e.message))
    })
  };
  const checkPassword = (event) => {
    // Password must be at least 8 chars
    password.length >= 8 ? charNumberValid = true :  charNumberValid = false;

    // Password must contain at least 1 special char
    const patternConfirmPassword = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g;
    patternConfirmPassword.test(password) ? specialCharValid = true : specialCharValid = false;

    // Password must contain at least a capital letter
    const patternUppercaseValid = /[A-Z]/;
    patternUppercaseValid.test(password) ? uppercaseValid = true : uppercaseValid = false;

    // Password must contain at least a lowercase letter
    const patternLowercaseValid = /[a-z]/;
    patternLowercaseValid.test(password) ? lowercaseValid = true : lowercaseValid = false;

    // Password must contain at least a number
    const patternNumberValid = /[0-9]/;
    patternNumberValid.test(password) ? numberValid = true : numberValid = false;

    checkFormValidity();
  }
  const comparePasswordFunc = (event) => {
    password === confirmPassword && password !== '' && confirmPassword !== '' ? passwordMatch = true : passwordMatch = false;

    checkFormValidity();
  };
  const checkFormValidity = () => {
    charNumberValid &&
    specialCharValid &&
    passwordMatch &&
    numberValid &&
    uppercaseValid &&
    lowercaseValid
    ? checkValid = true : checkValid = false;
  }
  console.log('checkValid', checkValid);

  return (
    <div className="modali-container">
      <hr className="hr_grey"/>
      <div className="modali-body">
        <form className="form_styles" onSubmit={e => handleForm(e)} autoComplete="off">
          <div className="form__input_group__password_validation">

            {/* Form input group */}
            <div className="form_input_group">
              {/* Email */}
              <div className="form_input cursor">
                <label htmlFor="email">Email</label>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  autoComplete="email"
                />
                <i></i>
                <span>Enter a valid email address</span>
              </div>

              {/* Password */}
              <div className="form_input cursor aligned_element">
                <label htmlFor="password">Password</label>
                <input
                  onChange={e => setPassword(e.target.value)}
                  name="password"
                  value={password}
                  type="password"
                  autoComplete="new-password"
                  onBlur={checkPassword()}
                />
                <i></i>
                <span>Create your password following the password rules</span>
              </div>

              {/* Confirm password */}
              <div className="form_input cursor aligned_element">
                <label htmlFor="password">Confirm password</label>
                <input
                  onChange={e => setComparePassword(e.target.value)}
                  name="confirmPassword"
                  value={confirmPassword}
                  type="password"
                  // placeholder="Confirm password"
                  autoComplete="confirm-password"
                  onBlur={comparePasswordFunc()}
                />
                <i></i>
                <span>Type your password again ensuring it matches</span>
              </div>
            </div>

            {/* Password validation */}
            <div className="form_password_validation">
              <div className="password_validation_title">
                <span>Password validation</span>
              </div>
              <div className="validation">
                <div className="validator flex_align_center">
                  <FontAwesomeIcon icon={charNumberValid ? 'check' : 'times'} className={`fa_icon ${charNumberValid ? "success" : "error"}`}/>
                  <span className="validation-item aligned_element">Must be at least 8 characters</span>
                </div>
                <div className="validator flex_align_center">
                  <FontAwesomeIcon icon={passwordMatch ? 'check' : 'times'} className={`fa_icon ${passwordMatch ? "success" : "error"}`}/>
                  <span className="validation-item aligned_element">Passwords must match</span>
                </div>
                <div className="validator flex_align_center">
                  <FontAwesomeIcon icon={specialCharValid ? 'check' : 'times'} className={`fa_icon ${specialCharValid ? "success" : "error"}`}/>
                  <span className="validation-item aligned_element">At least 1 special character from @#$%&</span>
                </div>
                <div className="validator flex_align_center">
                  <FontAwesomeIcon icon={numberValid ? 'check' : 'times'} className={`fa_icon ${numberValid ? "success" : "error"}`}/>
                  <span className="validation-item aligned_element">At least 1 number</span>
                </div>
                <div className="validator flex_align_center">
                  <FontAwesomeIcon icon={uppercaseValid ? 'check' : 'times'} className={`fa_icon ${uppercaseValid ? "success" : "error"}`}/>
                  <span className="validation-item aligned_element">At least 1 uppercase</span>
                </div>
                <div className="validator flex_align_center">
                  <FontAwesomeIcon icon={lowercaseValid ? 'check' : 'times'} className={`fa_icon ${lowercaseValid ? "success" : "error"}`}/>
                  <span className="validation-item aligned_element">At least 1 lowercase</span>
                </div>
              </div>
            </div>
          </div>

          {/* Register button */}
          <button className={'button form_button' + (!checkValid ? ' disabled' : '' )} type="submit" disabled={ !checkValid }>
            <div className="button_text flex_align_center">
              <span className="aligned_element">Register</span>
            </div>
          </button>
          { error && <div className="error_block">{error}</div> }

          <hr className="hr_grey" />

          {/* Google register button */}
          <button onClick={() => handleGoogleLogin()} className="button form_button flex_align_center" type="button">
            <div className="button_text flex_align_center">
              <span className="aligned_element">Register With Google</span>
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

export default RegisterModal;
