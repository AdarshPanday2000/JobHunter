import React , { useEffect, useContext } from 'react'
import { Context } from './main';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/home/Home';
import Jobs from './components/job/Jobs';
import JobDetails from './components/job/JobDetails';
import PostJob from './components/job/PostJob';
import MyJobs from './components/job/MyJobs';
import Application from './components/application/Application';
import MyApplication from './components/application/MyApplications';
import NotFound from './components/notFound/NotFound';
import axios from 'axios';
import { Toaster } from 'react-hot-toast'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  const { isAutorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
     const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/getUser" , {withCredentials : true})
        setUser(response.data.user);
        setIsAuthorized(true)
      } catch (error) {
        setIsAuthorized(false)
      }
     }
     fetchUser()
  }, [isAutorized])

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Register/> } />
        <Route path='/job/getall' element={ <Jobs/> } />
        <Route path='/job/:id' element={ <JobDetails/> } />
        <Route path='/job/post' element={ <PostJob/> } />
        <Route path='/job/me' element={ <MyJobs/> } />
        <Route path='/application/:id' element={ <Application/> } />
        <Route path='/application/me' element={ <MyApplication/> } />
        <Route path='*' element={ <NotFound/> } />  
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  )
}

export default App