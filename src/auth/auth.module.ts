import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session, User } from 'src/typeorm';
import { UsersService } from 'src/users/services/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './utils/LocalStrategy';
import { SessionSerializer } from './utils/SessionSerializer';

@Module({
  imports: [TypeOrmModule.forFeature([User,Session])],
  controllers: [AuthController],
  providers: [{
    provide:"AUTH_SERVICE",
    useClass:AuthService
  },{
    provide:"USER_SERVICE",
    useClass:UsersService
  },
  LocalStrategy,
  SessionSerializer
]
})
export class AuthModule {}
