import {Post} from "./post.model"
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';


@Injectable( {providedIn: 'root'})

export class PostService{
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

constructor(private http: HttpClient, private router: Router){ }

getPosts(){
  this.http.get<{message: string, posts: any }> ('http://localhost:3000/api/posts').pipe(map((postData) => {
    return postData.posts.map(post => {
      return {
        title: post.title,
        content: post.content,
        id: post._id,
        imagePath: post.imagePath
      };
    });
  })).subscribe(transformedPosts => {
    this.posts = transformedPosts;
    this.postsUpdated.next([...this.posts]);

  });

}

updatePost(id: string , title: string, content: string){
  const post: Post  = { id: id, title: title, content: content, imagePath: null};
  this.http.put('http://localhost:3000/api/posts/' + id, post)
  .subscribe(response => {
  const updatePost = [...this.posts];
  const oldPostIndex = updatePost.findIndex(p => p.id === post.id);
  updatePost[oldPostIndex] = post;
  this.posts = updatePost;
  this.postsUpdated.next([...this.posts]);
    this.router.navigate(["/"]);
})};

deletePost(postId: string) {
  this.http.delete("http://localhost:3000/api/posts/" + postId)
    .subscribe(() => {
      const updatePosts= this.posts.filter(post => {post.id !== postId});
      this.posts = updatePosts;
      this.postsUpdated.next([...this.posts]);
      console.log('Deleted!');
    });
}

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);

   // const post: Post = { id: null, title: title, content: content };

    this.http
      .post<{ message: string, post: string }>("http://localhost:3000/api/posts", postData)
      .subscribe(responseData => {
        const post: Post = {
          id:responseData.post,
          title : title,
          content: content,
          imagePath: responseData.post
        };

        this.posts.push(post);

        this.postsUpdated.next([...this.posts]);

        this.router.navigate(["/"])
      });

  }



getPostUpdateListener(){
    return this.postsUpdated.asObservable();
}

getPost(id: string){
  //return {...this.posts.find( p => p.id === id)}
  return this.http.get<{_id: string, title: string, content: string }>(
    "http://localhost:3000/api/posts/"+
    id
  )
}
}

//179.255.20.249
