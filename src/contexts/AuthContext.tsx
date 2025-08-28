import React, { createContext, useContext, useState, ReactNode } from "react";

type AuthContextData = {
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function signIn() {
    setIsLoading(true);
    // simulação de login
    setTimeout(() => {
      setIsAuthenticated(true);
      setIsLoading(false);
    }, 1000);
  }

  function signOut() {
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
  }