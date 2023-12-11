import { Injectable } from '@angular/core';
import { SignUp } from '../model/SignUp';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { SignIn } from '../model/SignIn';
import { Roles } from '../model/Roles';
import { UserRoles } from '../model/UserRoles';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  baseUrl=''
  constructor(private httpClient:HttpClient) {
    this.baseUrl=environment.APIUrl;
   }

  CreateAccount(user:SignUp):Observable<any>{
    return this.httpClient.post(this.baseUrl+'/api/Accounts/SignUP',user)
  }

  Login(user:SignIn):Observable<any>{
    return this.httpClient.post(this.baseUrl+'/api/Accounts/Login',user)
  }

  UserList():Observable<any>{
    return this.httpClient.get(this.baseUrl+'/api/Accounts/UserList')
  }

  AddRole(role:Roles):Observable<any>{
    return this.httpClient.post(this.baseUrl+'/api/Accounts/AddRole',role)
  }

  UserRoles(userId:string):Observable<any>{
    return this.httpClient.get(this.baseUrl+'/api/Accounts/UserRoles?UserId='+userId)
  }
  UpdateRole(userRoles:UserRoles[]):Observable<any>{
    return this.httpClient.post(this.baseUrl+"/api/Accounts/UpdateRole",userRoles)
  }

  GetUserRoles(username:string):Observable<any>{
    return this.httpClient.get(this.baseUrl+`/api/Accounts/GetUserRoles?username=${username}`)
  }
}
