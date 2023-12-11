import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from '../services/accounts.service';
import { SignUp } from '../model/SignUp';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {
  userForm!:FormGroup

  constructor(private formBuilder:FormBuilder, private accountService:AccountsService){}

  ngOnInit(): void {
    this.userForm=this.formBuilder.group({
      txtName:['',Validators.required],
      rbGender:[],
      txtEmail:['',Validators.compose([Validators.required,Validators.email])],
      txtPassword:['',Validators.required],
      txtConfirmPassword:['',Validators.required],
    })
  }

  AddUser(){
    debugger
    var user=new SignUp();
    user.name=this.userForm.value["txtName"]
    user.gender=this.userForm.value["rbGender"]
    user.email=this.userForm.value["txtEmail"]
    user.password=this.userForm.value["txtPassword"]
    user.confirmPassword=this.userForm.value["txtConfirmPassword"]
    
    this.accountService.CreateAccount(user).subscribe({
      
      next:data=>console.log("success"),
      error:err=>console.log(err)
    })
  }

}
