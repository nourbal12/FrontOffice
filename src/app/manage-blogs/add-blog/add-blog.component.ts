import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Blog } from 'src/app/models/Blog.model';
import { BlogService } from 'src/app/services/blog.service';
declare var jQuery:any;

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  form:any;
  @Input() blog: Blog;
  @Input() update: boolean = false;
  user:any;
  constructor(private blogService:BlogService, private router:Router) {
    this.user=  JSON.parse(localStorage.getItem('user'));
  }

  

  ngOnInit(): void {
    
    console.log(this.user)
    this.initializeForm();
  }

  initializeForm() {
    this.form = new FormGroup({
      title: new FormControl(this.update?this.blog.title:'',[Validators.required]),
      author: new FormControl(this.user.name,[Validators.required]),
      content: new FormControl(this.update?this.blog.content:'',[Validators.required]),
      author_id: new FormControl(this.user.id),
      upvote: new FormControl(this.update?this.blog.upvote:0),
      downvote: new FormControl(this.update?this.blog.downvote:0),
      

    });
  }

  addBlog() {
    this.form.value.author=this.user.name;
    this.form.value.author_id=this.user.id;
    this.update ? this.blogService.updateArticle(this.blog.id, this.form.value).subscribe() : this.blogService.addArticle(this.form.value).subscribe();
    this.update?this.removeUpdateModal():this.router.navigate(['list']);
    
  }

  removeUpdateModal() {
   window.location.reload();
  }

}
