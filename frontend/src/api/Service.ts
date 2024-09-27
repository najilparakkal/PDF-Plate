import { Axios, AxiosWithToken } from "./axios";
import { IUserDetails } from "./Interfaces";

export const registerUser = async (userData: IUserDetails) => {
  try {
    const response = await Axios.post("/signup", { userData });
    return response;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userData: IUserDetails) => {
  try {
    const response = await Axios.post("/signin", { userData });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const uploadPdf = async (data: string, email: string) => {
  try {
    const response = await AxiosWithToken.post("/upload", { email, data });
    return response.status === 200;
  } catch (error) {
    console.log(error);
  }
};
