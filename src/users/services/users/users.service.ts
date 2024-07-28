import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass, plainToInstance } from 'class-transformer';
import { User as UserEntity } from 'src/typeorm';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { SerializedUser, User } from 'src/users/types/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository : Repository<UserEntity>){}
    private users : User[] = [
        {
            id : 1,
            username : 'anson',
            password : 'anson'
        },
        {
            id : 2,
            username : 'danny',
            password : 'danny'
        },
        {
            id : 3,
            username : 'derek',
            password : 'derek'
        },
        {
            id : 4,
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

    getUserById(id : number){
        return this.users.find((user) => user.id === id);
    }

    createUser(createUserDto : CreateUserDto){
        const newUser = this.userRepository.create(createUserDto);
        return this.userRepository.save(newUser);
    }
}
