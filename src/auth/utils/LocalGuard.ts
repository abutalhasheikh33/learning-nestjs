import { CanActivate, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { Request } from 'express';



export class LocalAuthGuard extends AuthGuard('local') {
    
    async canActivate(context: ExecutionContext){
        console.log("Inside Local Guard")
        const result = await (super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return result;
    }
}

export class AuthenticatedGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest() as Request;
        return req.isAuthenticated();
        
    }
}