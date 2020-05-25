import { Component, OnInit } from '@angular/core';
//import {Post} from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../posts.service';
import { ActivatedRoute, ParamMap } from "@angular/router"
import { Post } from '../post.model';

@Component({
    selector:'app-post-create',
    templateUrl:'./post-create.component.html',
  styleUrls: ['./post-create-component.css']
})

export class PostCreateComponent{
  enteredTitle = "";
  enteredContent = "";
  post: Post;
    private mode = "create";
    private postId : string;


    constructor(public postsService: PostService, public router: ActivatedRoute){

  };

ngOnInit(){
  this.router.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode = "edit";
        this.postId =paramMap.get("postId");
       // this.post = this.postsService.getPost(this.postId);
        this.postsService.getPost(this.postId).subscribe(
          postData =>{
            this.post = {id:postData._id, title: postData.title, content: postData.content}
          }
        );

      }else{
        this.mode = "create";
        this.postId = null;
      }

  })
}

    //funcao que passa msg emit para o json local
    onSavePost(form: NgForm){
      if(form.invalid){
        return;
      }
      if(this.mode === 'create'){
        this.postsService.addPost(form.value.title, form.value.content);

      }else{
        this.postsService.updatePost(this.postId, form.value.title, form.value.content);

      }

      form.resetForm();
      //     const post =  {
 //         title: form.value.title,
       //   content: form.value.content
     //  };

       //objeto que recebe o post
     //  this.postCreated.emit(post);
     //  console.log(this.postCreated);
    }
}
