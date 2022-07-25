
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from 'src/app/models/Blog.model';
import { Evaluation } from 'src/app/models/Evaluation.model';
import { BlogService } from 'src/app/services/blog.service';
import { EvaluationService } from 'src/app/services/evaluation.service';
import { UserService } from 'src/app/services/user.service';

declare var jQuery:any;

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css','./../list-blogs/list-blogs.component.css']
})
export class BlogDetailsComponent implements OnInit {
  userId:any
  blogs: Blog[];
  evaluations: Evaluation[];
  userNames: String[] = [];
  user:any
  blog:Blog;
  id:number;
 
  constructor(private route:ActivatedRoute, private blogService:BlogService, private router:Router,private evaluationService:EvaluationService,private userService:UserService) { 
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
  vote(blog:Blog, evall:number) {
    this.evaluationService.getEvaluationByArticleAndUser(this.user.id, blog.id).subscribe((data:Evaluation[]) => {
      console.log(data)
      if(data.length == 0) {
        const evaluation = new Evaluation;
        evaluation.userId = this.user.id;
        evaluation.articleId = blog.id;
        evaluation.evaluation = evall;

        this.evaluationService.createEvaluation(evaluation).subscribe();
        

        let newBlog = new Blog;
        newBlog = blog;

        evall == 0 ? newBlog.downvote++ : newBlog.upvote ++;
        this.blogService.updateArticle(blog.id,newBlog).subscribe();
        
      }
    })
  }
  
  getUsersByEval(blog_id, evall) {
    this.userNames = [];
    this.evaluationService.getEvaluationByArticleAndEvaluation(blog_id, evall).subscribe((data:Evaluation[]) => {
      this.evaluations = data;
      console.log(data)
      for(let i = 0; i<this.evaluations.length; i++) {
        if(this.evaluations[i].evaluation == evall) {
          this.userService.getUserById(this.evaluations[i].userId).subscribe((data:any) => {
            if(!this.userNames.includes(data.name))
            this.userNames.push(data.name);
          })
        }
      }
      var popup = document.getElementById("myPopup"+blog_id);
      popup.classList.toggle("show");
    })
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
  deleteArray(id) {
    this.userNames = [];
    var popup = document.getElementById("myPopup"+id);
      popup.classList.toggle("hide");
  }

}
