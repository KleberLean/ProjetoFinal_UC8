import api from "../api";

export async function login(username, password) {
    try {
      const response = await api.post("/accounts/login/", {
        username,
        password,
      });
  
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.detail || "Erro no login");
      } else {
        throw new Error("Erro de conexão");
      }
    }
  }