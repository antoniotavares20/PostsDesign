import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostListComponent} from './posts/post-list/post-list.componenent';
import {PostCreateComponent} from './posts/posts-create/post-create.component'

const routes: Routes = [
  {path: '', component: PostListComponent },
  {path: 'create', component: PostCreateComponent},
  {path: 'edit/:postId', component: PostCreateComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
