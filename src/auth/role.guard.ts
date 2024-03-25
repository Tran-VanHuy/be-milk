// role.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from './constants';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        
        const requiredRole = this.reflector.get<string>('role', context.getHandler());
        if (!requiredRole) {
            // No role requirement, access granted
            return true;
        }

        const request = context.switchToHttp().getRequest();        
        const auth = request.rawHeaders.find(item => item.includes("Bearer"))

        let user: any = {};

        if (auth && auth.startsWith('Bearer ')) {
            const token = auth.substring(7);
            const decoded: any = jwt.verify(token, jwtConstants.secret);
            user = decoded; // Assuming user data is attached to request object
        }

        return user && user.role === requiredRole;
    }
}