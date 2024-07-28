import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Req, Res,Post,Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { CustomersService } from 'src/customers/services/customers/customers.service';

@Controller('customers')
export class CustomersController {
    constructor(private customersService : CustomersService){}
    @Get(':id') 
    getCustomer(@Param('id',ParseIntPipe) id:number,@Req() req: Request, @Res() res : Response){
        
        const customer = this.customersService.findCustomerById(id);
        if(customer){
            res.status(200).json({
                status: "Success",
                customer
            })
        }else{
            res.status(400).json({
                status:"Fail",
                message:"Error occured"
            })
        }
    }

    @Get('/search/:id')
    searchCustomerById(
        @Param('id',ParseIntPipe) id : number
    ){
        const customer = this.customersService.findCustomerById(id);
        if (customer) return customer;
        else throw new HttpException('Customer not found!',HttpStatus.BAD_REQUEST)
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
        console.log(createCustomerDto)
        this.customersService.createCustomer(createCustomerDto)
    }

    @Get('')
    getAllCustomers(){
       return this.customersService.getCustomers()
    }
    
}
