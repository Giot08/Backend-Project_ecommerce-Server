import { Router } from "express";
import { check } from "express-validator";

import { login } from '../controllers/auth.controllers';
import { validFields } from '../middlewares/validData';

const router = Router();

router.post("/login",[
    check("email", "El correo no es valido").isEmail(),
    check("password", "El password esta vacio").not().isEmpty(),
    validFields
] ,login );

export default router