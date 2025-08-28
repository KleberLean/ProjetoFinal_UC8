import axios from "axios";

const api = axios.create({
  baseURL: "https://zeladoria.tsr.net.br/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;