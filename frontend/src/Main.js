import './App.css';
import Question from './components/Questions/Question.component';
import Login from './components/User/Login.component';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar.component.js';
import Protected from './components/Protected/Protected.component.js';
import {useAuth} from './components/Protected/AuthProvider.js';

const ProtectedRoute = ({component, ...rest }) => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    console.log("login: ", isLoggedIn)
    return (
        isLoggedIn ? (
        <component />): (navigate('/login', {replace: true}))
    );
};

function Main() {
  return (
    <div className="App">
      <Navbar>
        {
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Protected Component={Question}/>}/>
            </Routes>
          </Router>
        }
      </Navbar>      
    </div>
  );
}

export default Main;
