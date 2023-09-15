import Passwords from "../Models/passwordsModel.js";
const userHelper = () => {
  const savePassword = async (passDetails) => {
    const newPassword = new Passwords(passDetails);
    newPassword.save();
    return;
  };

  const savedPasswords = async () => {
    const passwords = await Passwords.find();
    return passwords;
  };

  const findPassword = async (password) => {
    const copy = await Passwords.findOne({ password: password });
    return copy
  };

  return {
    savePassword,
    savedPasswords,
    findPassword
  };
};

export default userHelper;
