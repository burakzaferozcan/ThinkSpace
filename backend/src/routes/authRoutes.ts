import express from 'express';
import { loginUser, registerUser } from '../controllers/authController';

const router = express.Router();

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', registerUser);

// @route   POST api/auth/login
// @desc    Login a user
// @access  Public
router.post('/login', loginUser);

export default router;