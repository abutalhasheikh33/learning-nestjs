import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import entities, { Session } from './typeorm';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [CustomersModule, UsersModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'abutalha',
    database: 'tutorial_db',
    entities: entities,
    synchronize:true
  }), TypeOrmModule.forFeature([Session]),AuthModule,
  PassportModule.register({
    session: true,

  })
],
  controllers: [],
  providers: [],
})
export class AppModule {}
