import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  constructor(private userService:UserService,private route:Router) {

   }

  ngOnInit(): void {
    this.form= new FormGroup({
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
   
   
  }
  submit(){
    this.userService.register(this.form.value).subscribe(data=>{ console.log(data)});
    this.route.navigate(["/login"])
  }


}
