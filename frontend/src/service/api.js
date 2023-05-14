import axios from "axios";

export const api = axios.create({
//   baseURL:
    // window.location.host == "localhost:5173"
    //   ? "http://devbackend.g7.projetos.app.br"
    //   : "https://devbackend.g7.projetos.app.br",
  baseURL: "http://localhost:5500"
});
