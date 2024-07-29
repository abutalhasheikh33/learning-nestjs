import { PassportSerializer } from "@nestjs/passport";
import { Inject, Injectable } from "@nestjs/common";
import { UsersService } from "src/users/services/users/users.service";
import { User } from "src/typeorm";

@Injectable()
export class SessionSerializer extends PassportSerializer {

    constructor(
        @Inject('USER_SERVICE') private readonly userService: UsersService
    ){
        super()
    }

    serializeUser(user: User, done: (err,user : User) => void) {
        console.log("Inside Serialize User");
        done(null,user);
    }

    async  deserializeUser(user: User, done: (err,user : User) => void) {
        console.log("Inside Deserialize user")
        const userDB = await this.userService.findUserById(user._id);
        return userDB? done(null, userDB) : done(null,null);
    }
}

