import axios from "axios";

const API = axios.create({
  baseURL: "https://homeease-backend-birt.onrender.com"
});

export default API;