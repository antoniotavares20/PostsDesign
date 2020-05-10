import { Component, OnInit, OnDestroy} from '@angular/core';
import { PostService } from '../posts.service';
import {Post } from "../post.model";
import { Subscription }from "rxjs";


@Component({
  selector:'app-post-list',
  templateUrl:'./post-list.component.html',
  styleUrls:['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy{
  private postSub: Subscription;
// posts = [
//   {title:'First', content:' this first post\'s content'},
//   {title:'Secoutn', content:' this first post\'s content'},
//   {title:'Thirt', content:' this first post\'s content'}
// ]
//}

//@Input() posts: Post[] = [];
    posts: Post[] = [];
  //  onPostAdded(post){
   // this.posts.push(post);
   // console.log(this.posts);
//}
constructor(public postService: PostService){

}
ngOnInit(){
  this.postService.getPosts();
  this.postSub = this.postService.getPostUpdateListener()
                                  .subscribe((posts: Post[])=>
                                  { this.posts = posts});
}

onDelete(postId: string) {
  this.postService.deletePost(postId);
}

ngOnDestroy(){
  this.postSub.unsubscribe();
}
}
