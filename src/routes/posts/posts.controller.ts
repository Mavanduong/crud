import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts() {
    return this.postsService.getPosts();
  }

  @Post()
  createPost(@Body() body: any) {
  console.log("Received Body:", body); 
  return this.postsService.createPost(body);
}

  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postsService.getPost(id);
  }

  @Put(':id')
  updatePost(@Param('id') id: string, @Body() body: any) {
    return this.postsService.updatePosts(id, body);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePosts(id);
  }
}
