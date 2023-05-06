import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { useMemo } from "react";
import { Navigate } from "react-router-dom";
const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");

    if(recoveredUser){
      setUser(JSON.parse(recoveredUser));
    }
    setIsLoading(false);
  },[])


  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;