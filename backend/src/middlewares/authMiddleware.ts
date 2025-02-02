import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user';

interface JwtPayload {
  user: {
    id: string;
  };
}

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    res.status(401).json({ message: 'No token, authorization denied' });
    return;
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Token is not valid' });
      return;
    }
    // @ts-ignore
    req.user = (decoded as JwtPayload).user;
    next();
  });
};

export default authMiddleware;