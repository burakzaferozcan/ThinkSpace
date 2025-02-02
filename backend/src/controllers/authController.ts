import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';

const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const token = await registerUser(firstName, lastName, email, password);
    res.status(201).json({ token });
  } catch (err: any) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.json({ token });
  } catch (err: any) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

export { register as registerUser, login as loginUser };