import { Router } from "express";
import { login , Register} from "../controllers/user.controller.js";


const router = Router();

router.route("/login").post(login);
router.route("/Resister").post(Register);
router.route("/add_to_activity");
router.route("/add_All_activity");

export default router;
