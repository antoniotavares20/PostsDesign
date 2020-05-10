import {Post} from "./post.model"
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable( {providedIn: 'root'})

export class PostService{
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

constructor(private http: HttpClient){ }

getPosts(){
  this.http.get<{message: string, posts: any }> ('http://localhost:3000/api/posts').pipe(map((postData) => {
    return postData.posts.map(post => {
      return {
        title: post.title,
        content: post.content,
        id: post._id
      };
    });
  })).subscribe(transformedPosts => {
    this.posts = transformedPosts;
    this.postsUpdated.next([...this.posts]);
  });

}
updatePost(id: string , title: string, content: string){
  const post: Post  = { id: id, title: title, content: content};
  this.http.put('http://localhost:3000/api/posts' + id, post)
  .subscribe(response => console.log(response));
  const updatePost = [...this.posts];

  const oldPostIndex = updatePost.findIndex(p => p.id === post.id);
  this.posts = updatePost;
  this.postsUpdated.next([...this.posts])
}

deletePost(postId: string) {
  this.http.delete("http://localhost:3000/api/posts/" + postId)
    .subscribe(() => {
      const updatePosts= this.posts.filter(post => {post.id !== postId});
      this.posts = updatePosts;
      this.postsUpdated.next([...this.posts]);
      console.log('Deleted!');
    });
}

addPost(title: string, content: string){
  const post: Post = { id: null ,title: title, content: content }
  this.http.post<{message: string, postsId: string}>("http://localhost:3000/api/posts",post)
  .subscribe(responseData => {
    const id = responseData.postsId;
    post.id = id;
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  })
  this.posts.push(post);
  this.postsUpdated.next([...this.posts])
}


getPostUpdateListener(){
    return this.postsUpdated.asObservable();
}

getPost(id: string){
  //return {...this.posts.find( p => p.id === id)}
  return this.http.get<{_id: string, title: string, content: string }>(
    "http://localhost:3000/api/posts"+
    id
  )
}
}

//179.255.20.249
