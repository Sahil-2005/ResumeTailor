// lib/api.ts
import axios from "axios";

const API = "http://192.168.1.102:5000"; // ⚠️ replace with your server IP

export const api = axios.create({
  baseURL: API,
});
