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
        return this.postsService.createPost(body); // Pass 'body' to the service
    }

    @Get(':id')
        getPost(@Param('id') id: string){
            return this.postsService.getPost(id);
        
    }
    @Put(':id')
    updatePost(@Body() body:any,@Param('id') id:string){
        return this.postsService.updatePost(id, body);
    }
    @Delete(':id')
    deletePost(@Param('id') id:string){
        return this.postsService.deletePost(id);
    }
}
