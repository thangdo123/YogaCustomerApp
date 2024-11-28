import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { InternalAxiosRequestConfig } from "axios";
import { getToken } from "../utils/token.utils";

const updateHeaders = async (config: InternalAxiosRequestConfig) => {
  const token = await getToken();
  if (token) {
    config.headers!["authorization"] = `${token}`;
  }
  return config;
};

export const axiosInstance = axios.create({
  baseURL: "http://192.168.1.8:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => updateHeaders(config),
  (error) => Promise.reject(error)
);
