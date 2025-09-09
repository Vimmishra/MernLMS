import express from "express";
const router = express.Router();
import{createUser, getAllUsers, removeUser} from "../controllers/addUsersController.js";


router.post("/addUsers",createUser);
router.get("/getAllUsers", getAllUsers)
router.delete("/remove/:id", removeUser)

export default router;
 