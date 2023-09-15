import { axiosUserInstance } from "./axiosIntance";

export const savePassword = async (payload) => {
  try {
    const response = await axiosUserInstance.post("/api/save_password", payload);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const GetSavedPassword = async () => {
    try {
      const response = await axiosUserInstance.get("/api/get_passwords");
      return response.data;
    } catch (err) {
      return err.message;
    }
  };