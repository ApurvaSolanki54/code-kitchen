
import './App.css';
import Description from './components/Layout/Description.component.js';
import Edit from './components/Layout/Edit.component';
import Layout from './components/Layout/Layout.component';
import Question from './components/Questions/Question.component';
import Login from './components/User/Login.component';
import Profile from './components/User/Profile.component.js';
import Register from './components/User/Register.component';
import { BrowserRouter as Router, Route, Routes,redirect  } from 'react-router-dom';
import Demo from './components/User/Demo.js';
import LoadingLayout from './components/Loading/LoadingLayout.componenent.js';
import LoadingTable from './components/Loading/LoadingTable.js';
import UserSubmittedCode from './components/Layout/UserSubmittedCode.component.js';

import Navbar from './components/Navbar/Navbar.component.js';
import Protected from './components/Protected/Protected.component.js';
import {AuthProvider, useAuth} from './components/Protected/AuthProvider.js';
import Main from './Main.js';
import ProtectedRoute from './components/Protected/Protected.component.js';

import LogOutUser from './components/User/LogOutUser.js';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function App() {
  const [auth, setAuth] = useState(false)
    useEffect(()=>{
        if(Cookies.get('XSRF-TOKEN')){
            setAuth(true)
        }
    },[])
  Cookies.get('XSRF-TOKEN')
  return (
    <div className="App">
      <Navbar auth={auth}>
        {
          
          <Routes>
              <Route path="/signup" exact element={<Register/>} />
              <Route path="/login" exact element={<Login setAuth={setAuth}/>} />
              <Route path="/logout" exact element={<LogOutUser setAuth={setAuth}/>} />
              {/* <Route path="/" exact element={<Protected Component={Question}/>} /> */}

              {/* <Route path='/' element = { <Protected Component={Question} /> } /> */}
              
              {/* <ProtectedRoute path="/" component={Question} /> */}
              

              {/* <ProtectedRoute path="/">
                <Question/>
              </ProtectedRoute> */}

              <Route element={<ProtectedRoute />}>
                <Route path='/' element={<Question/>} />
                <Route path='/profile' element={<Profile/>}/>
                <Route path="/question/:questionId" element={<Layout/>} />
                {/* <Route path='/products' element={<Products/>} /> */}
              </Route>

              
            
          </Routes>
        }
      </Navbar>
      
      {/* <UserSubmittedCode/> */}

      {/* <Routes>
           
            
            <Route path="/code/:codeId" element={<DisplayCode />} />
          
        </Routes> */}

        {/* <LoadingLayout/> */}
        {/* <LoadingTable/> */}
        {/* <Profile/> */}

        {/* <Demo/> */}

        {/* <Description/> */}


      {/* <Edit/> */}
      {/* <Description/> */}
      {/* <Layout /> */}
      {/* <Question/> */}
      
    </div>



  );
}

export default App;
