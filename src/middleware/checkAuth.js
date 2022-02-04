import {  errorMessage } from '../helpers/messageHandler';
import { verifyToken } from '../utils/auth';

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.auth.split(' ')[1];

    if (!token) {
      return errorMessage(res, 403, `auth token is missing`);
    }

    console.log('token', token);

    const userId = verifyToken(token);

    if (!userId) {
      return errorMessage(res, 403, `Invalid auth token`);
    }

    req.user = userId;
    return next();
  } catch (err) {
    console.log('errrrrrrr', err);
    return errorMessage(res, 403, 'Token not valid');
  }
};