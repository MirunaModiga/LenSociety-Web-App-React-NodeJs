import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const test = (req, res) => {
  res.json({ message: 'Api route works' });
}

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account!'));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  console.log('Deleting user with ID:', req.params.id);
  if ((req.user.usertype !== 'admin') && (req.user.id !== req.params.id)) {
    return next(errorHandler(403, 'You are not allowed to delete this user'));
  }
  try {
    try {
      await User.findByIdAndDelete(req.params.id);
  } catch (error) {
      console.error('Error deleting user:', error);
      next(error);
  }
  
    res.status(200).json('User has been deleted');
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ usertype: { $ne: 'admin' } });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const subscribeUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          isSubscribed: req.body.isSubscribed,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};