import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction,Request,Response } from "express";


@Injectable()
export class ValidateCustomerMiddleware implements
NestMiddleware {
    use(req : Request, res: Response, next: NextFunction){
        console.log("Hello, World. I am inside ValidateCustomerMiddleWare")
        const authToken = req.headers.authorization;
        if(!authToken) return res.status(403).send({error:"No Authorization Token Provided"})
        if(authToken == '123') next();
        else return res.status(403).send({error:"Invalid Authorization Token Provided"})
        
    } 
}