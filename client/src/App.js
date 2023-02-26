import { createContext, useContext, useEffect, useState } from 'react';
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
import axios from 'axios';


export const SocialMediaContext = createContext();

function App() {
  const { user, dispatch, isFetching } = useContext(AuthContext);
  let tokenExists = JSON.parse(localStorage.getItem('token'));
  const [searchTerm, setSearchTerm] = useState();
  const [searchUsers, setSearchUsers] = useState();
  const [conversations, setConversations] = useState();
  const [allUsers, setAllUsers] = useState();


  useEffect(() => {
    const getFriends = async () => {
      await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/users/all-users?username=${searchTerm}`)
        .then(res => {
          setSearchUsers(res.data.data);
        })
        .catch(err => {
          console.log(err);
        })
    }

    if (searchTerm) {
      getFriends();
    }
  }, [searchTerm])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      let token = JSON.parse(localStorage.getItem('token'));
      getUser(token, dispatch);
    }
  }, [dispatch]);

  useEffect(() => {
    const getAllUsers = async () => {
      await axios
        .get(`${process.env.REACT_APP_SERVER_DOMAIN}/users/all-users`)
        .then((res) => {
          let data = res.data.data?.filter(u => u._id !== user?._id);
          setAllUsers(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getAllUsers();
  }, [user]);

  return (
    <>
      {isFetching ? <div className="d-flex align-items-center justify-content-center my-5"> <CircularProgress style={{ color: 'green' }} /> </div> : <SocialMediaContext.Provider value={{
        searchTerm, setSearchTerm,
        searchUsers, setSearchUsers,
        conversations, setConversations,
        allUsers, setAllUsers,
      }}> <BrowserRouter>
          {user || tokenExists ? <Navbar isLoading={isFetching} /> : null}
          <Routes>
            <Route exact path='/' element={tokenExists ? <Home /> : <Login />} />
            <Route exact path='/profile/:userId' element={user ? <Profile /> : <Register />} />
            <Route exact path='/messenger' element={user ? <Messenger /> : <Login />} />
            <Route exact path='/login' element={user ? <Navigate to='/' /> : <Login />} />
            <Route exact path='/signup' element={user ? <Navigate to='/' /> : <Register />} />
          </Routes>
        </BrowserRouter>
      </SocialMediaContext.Provider>}
    </>
  );
}

export default App;
