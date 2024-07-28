import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CustomersController } from './controllers/customers/customers.controller';
import { CustomersService } from './services/customers/customers.service';
import { ValidateCustomerMiddleware } from './middlewares/validate-customer.middleware';
import { UsersController } from 'src/users/controllers/users/users.controller';
import { ValidateCustomerAccountMiddleware } from './middlewares/validate-customer-account.middleware';
import { NextFunction, Request, Response } from 'express';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(ValidateCustomerMiddleware,ValidateCustomerAccountMiddleware,(req : Request,res : Response,next : NextFunction)=>{
        console.log("Last Middleware")
        next()
      })
      .exclude({
        path:'customers',
        method:RequestMethod.GET
      })
      .forRoutes(
        {
          path:'/customers/create',
          method:RequestMethod.POST
        },
      CustomersController
      
    )
    }
}
