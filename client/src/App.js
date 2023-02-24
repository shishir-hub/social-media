import { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { getUser } from './apiCalls';
import './App.css';
import { AuthContext } from './context/AuthContext';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import Navbar from './components/navbar/Navbar';
import Messenger from './pages/messenger/Messenger';
import { CircularProgress } from '@material-ui/core';

function App() {
  const { user, dispatch, isFetching } = useContext(AuthContext);
  let tokenExists = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    if (localStorage.getItem('token')) {
      let token = JSON.parse(localStorage.getItem('token'));
      getUser(token, dispatch);
    }
  }, [dispatch]);

  return (
    <>
      {isFetching ? <div className="d-flex align-items-center justify-content-center my-5"> <CircularProgress style={{ color: 'green' }} /> </div> : <BrowserRouter>
        {user || tokenExists ? <Navbar isLoading={isFetching} /> : null}
        <Routes>
          <Route exact path='/' element={tokenExists ? <Home /> : <Login />} />
          <Route exact path='/profile/:userId' element={user ? <Profile /> : <Register />} />
          <Route exact path='/messenger' element={user ? <Messenger /> : <Login />} />
          <Route exact path='/login' element={user ? <Navigate to='/' /> : <Login />} />
          <Route exact path='/signup' element={user ? <Navigate to='/' /> : <Register />} />
        </Routes>
      </BrowserRouter>}
    </>
  );
}

export default App;
