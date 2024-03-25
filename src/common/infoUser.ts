import * as jwt from 'jsonwebtoken';
import { jwtConstants } from 'src/auth/constants';
export const infoUser =  (req?: any) => {

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7); // Remove "Bearer " from token string
      try {
        const decoded = jwt.verify(token, jwtConstants.secret); // Replace 'your_secret_key' with your actual secret key
        req.user = decoded; // Attach the decoded token to the request object
        return req.user;
      } catch (err) {
        console.error('Invalid token:', err.message);
      }
    }
}