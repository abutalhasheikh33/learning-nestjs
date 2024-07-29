import { Controller, Get, Post, Req, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { AuthenticatedGuard, LocalAuthGuard } from 'src/auth/utils/LocalGuard';


@Controller('auth')
export class AuthController {

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(){}


    @Get('')
    async getAuthSession(@Session() session: Record<string,any> ) {
        console.log(session)
        console.log(session.id)
        session.authenticated = true;
        return session;
    }

    @UseGuards(AuthenticatedGuard)
    @Get('status')
    async getAuthStatus(@Req() req : Request){
        return req.user;
    }
}
