import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { useMemo } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  /*useEffect(() => {
    const recoveredUser = localStorage.getItem("user");

    if(recoveredUser){
      setUser(JSON.parse(recoveredUser));
    }
    setIsLoading(false);
  },[])*/

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setToken(JSON.parse(token));
        try {
          const response = await axios.get("http://localhost:8080/me", {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.log("Erro ao obter usuário:", error);
        }
      }
      setIsLoading(false);
    };
  
    fetchData();
  }, [token]);


  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;