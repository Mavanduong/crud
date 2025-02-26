import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import envCofig from 'src/share/config';
import { PrismaService } from 'src/share/services/prisma/prisma.service';


@Injectable()
export class PostsService {

  constructor(private readonly PrismaService: PrismaService){}
  getPosts() {
    console.log(envCofig.REFRESH_TOKEN_EXPIRES_IN)

    return this.PrismaService.post.findMany();
  }
 
  createPost(body: any) {
    return this.PrismaService.post.create({
      data: {
        title: body.title,
        content: body.content || null,
        userId: 1, 
      },
    });
  }
  
  

  getPost(id: string) {
    return `Post: ${id}`;
  }

  updatePosts(id: string, body: any) {
    return `Update Post: ${id}`;
  }

  deletePosts(id: string) {
    return `Deleted Post: ${id}`;
  }
}


