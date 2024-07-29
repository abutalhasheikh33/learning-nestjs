import { Controller, Inject,Get,Param, HttpException, HttpStatus, UseInterceptors, ClassSerializerInterceptor, ParseIntPipe, UseFilters, Body, Post, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard, LocalAuthGuard } from 'src/auth/utils/LocalGuard';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound.exception';
import { HttpExceptionFilter } from 'src/users/filters/HttpException.filter';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types/User';

@Controller('users')
export class UsersController {
    constructor(@Inject('USER_SERVICE') private readonly userService : UsersService){}

    @UseGuards(AuthenticatedGuard)
    @Get('')
    getUsers(){
        return this.userService.getUsers()
    }


    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/username/:username')
    getUserByUsername(@Param('username') username : string) {
        const user = this.userService.getUserByUsername(username);
        if(user) return new SerializedUser(user);
        else throw new HttpException('User not found',HttpStatus.BAD_REQUEST)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/id/:id')
    @UseFilters(HttpExceptionFilter)
    getUserById(@Param('id',ParseIntPipe) id : number) {
        const user = this.userService.getUserById(id);
        if(user) return new SerializedUser(user);
        else throw new UserNotFoundException("User id invalid",HttpStatus.NOT_FOUND)
    }

    
    
    @Post('create')
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto : CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    
}
