import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './routes/posts/posts.module';
import { ShareModule } from './share/share.module';
import { AuthService } from './routes/auth/auth.service';
import { AuthModule } from './routes/auth/auth.module';
import { AuthController } from './routes/auth/auth.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [PostsModule, ShareModule, AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService,{
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor
  }],
  
})
export class AppModule {}
