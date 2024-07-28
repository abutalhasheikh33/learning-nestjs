import { Injectable } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { SerializedUser, User } from 'src/users/types/User';

@Injectable()
export class UsersService {
    private users : User[] = [
        {
            username : 'anson',
            password : 'anson'
        },
        {
            username : 'danny',
            password : 'danny'
        },
        {
            username : 'derek',
            password : 'derek'
        },
        {
            username : 'samantha',
            password : 'samantha'
        },
        
    ]

    getUsers() {
        return this.users.map((user)=>plainToInstance(SerializedUser,user));
    }

    getUserByUsername(username: string){
        return this.users.find((user) => user.username === username)
    }
}
