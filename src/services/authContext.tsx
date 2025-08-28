import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { saveToken, getToken, removeToken } from "../services/authStorage";

type AuthContextData = {
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verifica token no AsyncStorage ao iniciar
    async function loadAuth() {
      const token = await getToken();
      if (token) setIsAuthenticated(true);
      setIsLoading(false);
    }
    loadAuth();
  }, []);

  const signIn = async (token: string) => {
    try {
      await saveToken(token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await removeToken();
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return context;
}
