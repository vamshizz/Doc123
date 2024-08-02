import { Router } from "express";
 import {patient_post,login_post} from "../Controller/authcontroller.js"
const router=Router();

router.post('/signup',patient_post);
router.post('/login',login_post);

export default router;