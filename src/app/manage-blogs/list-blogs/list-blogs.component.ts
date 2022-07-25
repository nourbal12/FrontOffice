import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from 'src/app/models/Blog.model';
import { Evaluation } from 'src/app/models/Evaluation.model';
import { Client, User } from 'src/app/models/User.model';
import { BlogService } from 'src/app/services/blog.service';
import { EvaluationService } from 'src/app/services/evaluation.service';
import { UserService } from 'src/app/services/user.service';
declare var jQuery:any;
@Component({
  selector: 'app-list-blogs',
  templateUrl: './list-blogs.component.html',
  styleUrls: ['./list-blogs.component.css']
})

export class ListBlogsComponent implements OnInit {
  userId:any
  blogs: Blog[];
  evaluations: Evaluation[];
  userNames: String[] = [];
  searchTerm:any;
  user:any
 
  constructor(private blogService: BlogService, private router:Router,
    private userService:UserService, private evaluationService:EvaluationService) {
    this.user=  JSON.parse(localStorage.getItem('user'));
   }

  ngOnInit(): void {
   
    if(localStorage.getItem('user') == null) {
      jQuery('.login').modal('show');
    }
    else{
      this.getBlogs();
    }
    let v=localStorage.getItem('user')
    if (v!==null){
    this.user = JSON.parse(v);
    this.userId=this.user.userInfo.id;
    
  }
}
  logOut(){
    localStorage.clear();
    this.router.navigate(["/login"]);}
  getBlogs() {
    this.blogService.getArticles().subscribe((data:Blog[]) => {
      this.blogs = data;
      console.log(data);
    })
  }

  redirectToBlogDetail(id:number){
    this.router.navigate(['blog-details'], { queryParams: { id: id } });
  }
  closeModal(modalClass:string){
  jQuery(modalClass).modal('hide');
  }
  redirectToLogin() {
    this.router.navigate(['login']);
    this.closeModal(".login")
  }
  redirectToAddBlog() {
    this.router.navigate(['add-blog']);
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

  search(value: string): void {
    this.blogs = this.blogs.filter((val) => val.title.toLowerCase().includes(value));
    if (value.toLowerCase()==""){
      this.getBlogs()
      
    }
  }

  deleteArray(id) {
    this.userNames = [];
    var popup = document.getElementById("myPopup"+id);
      popup.classList.toggle("hide");
  }


}
