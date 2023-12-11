import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { menu } from '../Menu';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  role!:string
  liMenu!:any[]
  filteredMenu:any[]=[]
  constructor(private router:Router){
    debugger
    this.liMenu=menu
    this.role=JSON.parse( JSON.stringify(localStorage.getItem("Roles")))
    this.liMenu.forEach((element:any)=>{
      const isInRole=element.roles.find((x:any)=>x==this.role)
      if(isInRole !=undefined){
        this.filteredMenu.push(element)
      }
    })

  }
  onLogout(){
    localStorage.removeItem("SecurityKey")
    localStorage.removeItem("Roles")
    this.router.navigate(['/'])
  }

}
