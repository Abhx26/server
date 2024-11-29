import express from "express";
import cookieParser from "cookie-parser";
import authenticate from "../middleware/authenticate.js";
import authController from "../controllers/authController.js";
import "../DB/conn.js";  // This import is for the DB connection

const router = express.Router();
// const cookieParser = require("cookie-parser");
router.use(cookieParser());

router.post('/register', authController.register);
router.post('/login',authController.login);
router.post('/passwordLink', authController.passwordLink);
router.get('/forgotPassword/:id/:token', authController.forgotPassword);
router.post('/:id/:token', authController.setNewPassword);

router.post('/emailVerificationLink', authenticate, authController.emailVerificationLink);
router.get('/getuser', authenticate, authController.getAllInstructor);
router.delete('/deleteuser/:facultyId', authenticate, authController.deleteFaculty);

router.get('/verifyEmail/:id/:token', authController.verifyEmail);

router.get('/logout/:userId', authController.logout);
router.put('/updateProfile', authenticate, authController.updateProfile);

router.get('/about', authenticate, authController.about);
router.get('/getdata',authenticate,authController.getdata);
router.post('/contact', authenticate, authController.contact);

export default router;  // Correct export
