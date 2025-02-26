import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './routes/posts/posts.module';
import { ShareModule } from './share/share.module';

@Module({
  imports: [PostsModule, ShareModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
