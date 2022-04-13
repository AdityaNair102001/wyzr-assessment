import { createContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const navigate = useNavigate();

  const [login, setLogin] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [loginError, setLoginError] = useState(null);
  // const [showProcessLoader, setShowProcessLoader] = useState(false);

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.setItem("loginState", false);
    navigate("/", { replace: true });
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        setLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
