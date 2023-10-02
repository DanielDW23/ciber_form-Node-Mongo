import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedJwt = localStorage.getItem("jwt");

    if (storedUser && storedJwt) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (token, userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem("jwt", token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
  };

  const authValue = {
    isLoggedIn,
    isLoading,
    user,
    login,
    logout,
    jwt
  };


  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };