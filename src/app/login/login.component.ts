import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignIn } from '../model/SignIn';
import { AccountsService } from '../services/accounts.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm!:FormGroup
  @ViewChild('ddllanguage') language!:ElementRef

  constructor(private formBuilder:FormBuilder,
             private accountService:AccountsService,
             private router:Router,
             private translate:TranslateService){}


  ngOnInit(): void {
    this.LoginForm=this.formBuilder.group({
      txtUsername:['',Validators.required],
      txtPassword:['',Validators.required]
    })

  }

  onLogin(){
    var user=new SignIn();
    user.username=this.LoginForm.value["txtUsername"]
    user.password=this.LoginForm.value["txtPassword"]
    this.accountService.Login(user).subscribe({
      next:data=>{
        debugger
        localStorage.setItem("SecurityKey",data.token)
        this.accountService.GetUserRoles(this.LoginForm.value["txtUsername"]).subscribe({
          next:data=>{
            debugger
            localStorage.setItem("Roles",data)
            this.router.navigate(['/dashboard/PatientList'])
          },
          error:err=>console.log(err)
        })
        

      },
      error:err=>console.log(err)
    })
    
  }

  changeLanguage(){
    this.translate.use(this.language.nativeElement.value)

    if(this.language.nativeElement.value=="ar"){
      document.getElementsByTagName("body")[0].dir="rtl";
    }
    else{
      document.getElementsByTagName("body")[0].dir="ltr";
    }

  }

}
