import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  constructor(private route:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.form= new FormGroup({
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
   
  }
  submit(){
    this.userService.login(this.form.value).subscribe( data => {
      console.log(data);
      localStorage.setItem('user',JSON.stringify(data));
      this.route.navigate(["list"]);
  })
  
}

}
