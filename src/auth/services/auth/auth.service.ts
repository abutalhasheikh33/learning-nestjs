import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import * as bcrypt from "bcrypt"
import { comparePasswords } from 'src/utils/bcrypt';
@Injectable()
export class AuthService {
    constructor(@Inject('USER_SERVICE') private readonly userService : UsersService){}
    async validateUser(username : string,password : string){
        const userDB = await this.userService.findUserByUsername(username);
        if(userDB ){
            const matched = comparePasswords(password,userDB.password);
            if(matched){
                console.log("User validation success");
                return userDB;
            }else{
                console.log("Password does not matched");
                return null;
            }
            
        }
        return null;

    }
}
