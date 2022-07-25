import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBlogComponent } from './manage-blogs/add-blog/add-blog.component';
import { BlogDetailsComponent } from './manage-blogs/blog-details/blog-details.component';
import { ListBlogsComponent } from './manage-blogs/list-blogs/list-blogs.component';
import { HomeComponent } from './public/home/home.component';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';

const routes: Routes = [
  {path:'list',component:ListBlogsComponent},
  {path:'blog-details',component:BlogDetailsComponent},
  {path:'add-blog',component:AddBlogComponent},
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
