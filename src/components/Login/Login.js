import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFbLogin, handleGoogleSignIn, handleSignOut, initializeLogInFramework, signInWithEmailAndPassword } from './LoginManager';

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    password: '',
  });
  initializeLogInFramework();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let {from} = location.state || {from: {pathname : '/'}};
  
 
  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      setUser(res);
    setLoggedInUser(res);
    history.replace(from);
    })
  }

const signOut = () =>{
  handleSignOut()
  .then(res => {
    setUser(res);
    setLoggedInUser(res);
  })
}
 const fbLogin = () =>{
   handleFbLogin()
   .then(res=>{
    setUser(res);
    setLoggedInUser(res);
    history.replace(from);
   })
 }
  const handleBlur = (event) => {
    let isFormValid = true;

    if (event.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
    }

    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFormValid = passwordHasNumber && isPasswordValid
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo)
    }
  }
  const handleSubmit = (event) => {
    if (user.email && user.password) {
        createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          setUser(res);
    setLoggedInUser(res);
    history.replace(from);
        })
    }
    if (!newUser && user.email && user.password) {
     signInWithEmailAndPassword(user.email, user.password)
     .then(res => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
     })
    }
    event.preventDefault()
  }
 
  return (
    <div style={{textAlign:'center'}}>
      { user.isSignedIn ? <button onClick={signOut}>Sign out</button> :
        <button onClick={googleSignIn}>Sign in with Google</button>}
        <button onClick={fbLogin}>login using facebook</button>
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
          <img src={user.photo} alt="" />
          <p>Your email is : {user.email}</p>
        </div>
      }

      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">new user sign up</label>
      <form action="" onSubmit={handleSubmit}>
        {newUser && <input type="text" name='name' placeholder='Nickname' onBlur={handleBlur} />}
        <br />
        <input type="text" name='email' onBlur={handleBlur} placeholder='Email' required />
        <br />
        <input type="password" name='password' onBlur={handleBlur} placeholder='password' required />
        <br />
        <input type="submit" value={newUser ? 'sign up' : 'sign in'} />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {user.success && <p style={{ color: 'green' }}>user {newUser ? 'created' : 'login'} successfully.</p>}


    </div>
  );
}

export default Login;
