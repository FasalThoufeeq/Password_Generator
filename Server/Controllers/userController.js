import userHelper from "../Helpers/userHelper.js";
import asyncHandler from "express-async-handler";

const userController = () => {
  const savePassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const isPasswordExist = await userHelper().findPassword(password);
    if (!isPasswordExist) {
      const UpdatedObject = { password: password, length: password.length };
      const savingPassword = await userHelper().savePassword(UpdatedObject);
      res.json({
        status: "success",
        message: "Password Saved successfully",
      });
    }
  });

  const GetSavePasswords = asyncHandler(async (req, res) => {
    const savedPasswords = await userHelper().savedPasswords();
    console.log(savedPasswords);
    res.json({
      savedPasswords,
      status: "success",
      message: "Passwords Fetched successfully",
    });
  });

  return {
    savePassword,
    GetSavePasswords,
  };
};

export default userController;
