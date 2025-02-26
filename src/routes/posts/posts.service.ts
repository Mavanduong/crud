import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/share/services/prisma/prisma.service';


@Injectable()
export class PostsService {

  constructor(private readonly PrismaService: PrismaService){}
  getPosts() {
    return this.PrismaService.post.findMany();
  }

  createPost(body: any) {
    const UserId =1;

    return this.PrismaService.post.create({
       
      data:{
        
      title: body.title,
      content: body.content,
      userId: UserId,
      
      }

      
    });
  }

  getPost(id: string) {
    return `Post: ${id}`;
  }

  updatePost(id: string, body: any) {
    return `Update Post: ${id}`;
  }

  deletePost(id: string) {
    return `Deleted Post: ${id}`;
  }
}


