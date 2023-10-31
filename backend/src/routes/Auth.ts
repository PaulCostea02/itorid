import express from 'express';
import controller from '../controllers/Auth';

const router = express.Router();

//router.post('/login', controller.loginUser);
router.post('/signUp', controller.registerUser);

export = router;
