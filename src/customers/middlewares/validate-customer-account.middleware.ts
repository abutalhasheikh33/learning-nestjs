import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction,Request,Response } from "express";


@Injectable()
export class ValidateCustomerAccountMiddleware implements
NestMiddleware {
    use(req : Request, res: Response, next: NextFunction){
        console.log("Hello, World. I am inside Validate Customer Account MiddleWare")
       
        const valid = req.headers.valid;
        console.log(valid)
        if(valid === "false") return res.status(401).send({error:"Account is invalid"})
        next()
    } 
}