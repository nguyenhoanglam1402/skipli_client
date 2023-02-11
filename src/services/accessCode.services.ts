import axios from "axios";

const config = {
  headers: {},
};

export const createNewOTP = (data: { phoneNumber: string }) => {
  return axios.post("http://localhost:3001/access-code/new", data, config);
};

export const validateOTP = (data: { phoneNumber: string, otp: string }) => {
  return axios.post("http://localhost:3001/access-code/validate", data, config);
};