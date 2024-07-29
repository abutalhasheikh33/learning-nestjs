import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from "express-session"
import * as passport from "passport"
import { TypeormStore } from 'connect-typeorm';
import { DataSource } from 'typeorm';
import { Session as SessionEntity } from './typeorm/Session';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')

    // Get the DataSource instance
    const dataSource = app.get(DataSource);


  
    // Get the repository for the Session entity
    const sessionRepository = dataSource.getRepository(SessionEntity);


  app.use(session(
    {
      secret: "If it's important you will find if not you will find an excuse",
      resave:false,
      saveUninitialized:false,
      cookie: {
        maxAge:60000
      },
      store: new TypeormStore({
        cleanupLimit:10
      }).connect(sessionRepository)
    },
    
  ))
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(3000);
}
bootstrap();
