import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
    getPosts(){
        return 'All posts';
    }

    createPost(body: any){
        return body;
    }

    getPost(id: string){
        return 'Posts : $id';
    }

    updatePost(id: string,body: any){
        return 'update Posts :  $id';
    }

    deletePost(id: string){
        return 'delete tt';
    }

}

