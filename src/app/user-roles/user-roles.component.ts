import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../services/accounts.service';
import { ActivatedRoute } from '@angular/router';
import { UserRoles } from '../model/UserRoles';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent implements OnInit {
  
  userId!:string
  userRoles!:UserRoles[]
  constructor(private activatedRoute:ActivatedRoute,
              private accountService:AccountsService){}

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.queryParams["Id"] !=undefined){
      this.userId=this.activatedRoute.snapshot.queryParams["Id"]
      this.loadRoles()
    }

  }

  loadRoles(){
    this.accountService.UserRoles(this.userId).subscribe({
      next:data=>{
        this.userRoles=data
      },
      error:err=>console.log(err)
    })  
  }

  onUpdate(userRoles:UserRoles[]){
    this.accountService.UpdateRole(userRoles).subscribe({
      next:data=>{
        alert("success")
      },
      error:err=>{
        alert("error happned")
      }
    })
  }


}
