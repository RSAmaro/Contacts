import React, { createContext, useEffect, useState } from "react";

interface IAuth {
  token: string;
  getAuth: boolean;
}

export interface IAuthContext {
  auth: IAuth;
  setAuth: (state: IAuth) => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [auth, setAuth] = useState({ token: "", getAuth: false });
  

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
