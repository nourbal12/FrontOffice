
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from 'src/app/models/Blog.model';
import { BlogService } from 'src/app/services/blog.service';

declare var jQuery:any;

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css','./../list-blogs/list-blogs.component.css']
})
export class BlogDetailsComponent implements OnInit {

  blog:Blog;
  id:number;
  user:any;
  constructor(private route:ActivatedRoute, private blogService:BlogService, private router:Router) { 
    this.user=  JSON.parse(localStorage.getItem('user'));}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log(this.id)
    })

    this.getBlog();

  }
  redirectToBlogList(){
    this.router.navigate(['/list']);
  }

  getBlog() {
    this.blogService.getArticle(this.id).subscribe((data: Blog) => {
      this.blog = data;
      console.log(this.blog)
    })
  }

  upvote() {
    this.blog.upvote ++;
    this.blogService.updateArticle(this.id, this.blog).subscribe();
  }

  downvote() {
    this.blog.downvote ++;
    this.blogService.updateArticle(this.id, this.blog).subscribe();
  }

  onUpdate(){
    jQuery('.modal-update-blog').modal('show');
  }

  onDelete() {
    if (confirm("Are you sure to delete this blog !!") == true) {
      this.blogService.deleteArticle(this.blog.id).subscribe();
      this.router.navigate(['list']);
    }
  }

}
