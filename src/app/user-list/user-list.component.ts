import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../services/accounts.service';
import { Users } from '../model/Users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  liUsers!:Users[]
  constructor(private accountService:AccountsService,private router:Router){}

  ngOnInit(): void {
  this.accountService.UserList().subscribe({
    next:data=>{
      this.liUsers=data;
    },
    error:err=>console.log(err)
  })
  }

  onGetUserRole(userId:string){
    this.router.navigate(['/dashboard/userRoles'],{queryParams:{Id:userId}})
  }
}
