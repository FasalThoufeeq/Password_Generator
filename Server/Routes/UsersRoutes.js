import express from "express";
import userController from "../Controllers/userController.js";

const userRoutes=()=>{
    const router = express.Router();
    const controller=userController()

    router.post('/save_password',controller.savePassword)

    router.get('/get_passwords',controller.GetSavePasswords)

    return router;
}

export default userRoutes;