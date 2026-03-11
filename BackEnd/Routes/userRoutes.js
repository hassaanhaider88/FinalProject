import express from 'express';

import { LoggedUser, LoginUser, RegisterUser } from '../Controllers/userController.js';

const router = express.Router();

router.post("/login", LoginUser);

router.post("/register", RegisterUser);

router.get("/loged-user",LoggedUser)

export default router;