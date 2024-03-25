// auth.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from './constants';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7); // Remove "Bearer " from token string
      try {
        const decoded = jwt.verify(token, jwtConstants.secret); // Replace 'your_secret_key' with your actual secret key
        req.user = decoded; // Attach the decoded token to the request object
      } catch (err) {
        console.error('Invalid token:', err.message);
      }
    }

    next();
  }
}
