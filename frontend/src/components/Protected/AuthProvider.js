import React, { createContext, useState, useContext, useEffect } from 'react';
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(()=>{
    ( async()=>{
      try{
        const XSRF = document.cookie;
        if(XSRF){
          console.log("XSRF:" ,XSRF)
          setIsLoggedIn(true);
        }
        else{
          setIsLoggedIn(false)
        }
      }
      catch(error){
        console.log(error)
      }
    })()
  }, [])
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
