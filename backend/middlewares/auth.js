import { catchAsyncError } from './catchAsyncError.js';
import ErrorHandler from './error.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/userSchema.js';


// export const isAuthorized = catchAsyncError(async(req,res,next) => {
//     const { token } = req.cookies;
    
//     if(!token){
//         console.log('Token not found in cookies');
//         return next(new ErrorHandler('User not authorized', 400))
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//     req.user = await User.findById(decoded.id);

//     next()
// })

export const isAuthorized = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
  
    if (!token) {
      console.log('Token not found in cookies');
      return next(new ErrorHandler('User not authorized', 400));
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decoded.id);
  
      if (!req.user) {
        console.log('User not found for given token');
        return next(new ErrorHandler('User not authorized', 400));
      }
  
      next();
    } catch (error) {
      console.log('Error verifying token:', error);
      return next(new ErrorHandler('User not authorized', 400));
    }
  });
  