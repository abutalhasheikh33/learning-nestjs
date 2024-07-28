import { Controller, Inject,Get,Param, HttpException, HttpStatus, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types/User';

@Controller('users')
export class UsersController {
    constructor(@Inject('USER_SERVICE') private readonly userService : UsersService){}


    @Get('')
    getUsers(){
        return this.userService.getUsers()
    }


    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/:username')
    getUserByUsername(@Param('username') username : string) {
        const user = this.userService.getUserByUsername(username);
        if(user) return new SerializedUser(user);
        else throw new HttpException('User not found',HttpStatus.BAD_REQUEST)
    }
}
