import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user';

const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  // Check if user exists
  let user = await User.findOne({ email });
  if (user) {
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  await user.save();

  // Generate JWT
  const payload = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );

  return token;
};

const loginUser = async (email: string, password: string) => {
  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password as string);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Generate JWT
  const payload = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );

  return token;
};

export { registerUser, loginUser };