import { Component,OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {FormGroup,Validators} from '@angular/forms';
import { countryDTO } from '../model/countryDTO';
import { CountryService } from '../services/country.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-new-country',
  templateUrl: './new-country.component.html',
  styleUrls: ['./new-country.component.css']
})
export class NewCountryComponent implements OnInit {

  Id!:number
  IsEdit:boolean=false
  countryForm !:FormGroup
  constructor(private formBuilder:FormBuilder, 
              private CountryService:CountryService,
              private activatedRoute:ActivatedRoute,
              private translate:TranslateService){}

  ngOnInit(): void {
    debugger

    if(this.activatedRoute.snapshot.queryParams["id"] !=undefined){
      this.Id= this.activatedRoute.snapshot.queryParams["id"]
      this.onEdit(this.Id)
      this.IsEdit=true
    }
    this.countryForm=this.formBuilder.group({
      txtCode:['',Validators.required],
      txtName:['',Validators.required],
    })
  }


  onEdit(id:number){
    debugger
    this.CountryService.Get(id).subscribe({
      next:data=>{
        debugger
        this.countryForm.controls["txtCode"].setValue(data.code)
        this.countryForm.controls["txtName"].setValue(data.name)
      },
      error:err=>{
        console.log("error")
      }
    })
  }

  onSave(){
    debugger
    var country=new countryDTO();
    country.code=this.countryForm.value["txtCode"]
    country.name= this.countryForm.value["txtName"]
    this.CountryService.Insert(country).subscribe({
      next:data=>{
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: this.translate.instant("alerts.SuccessMessage"),
          showConfirmButton: false,
          timer: 5000
        });
      },
      error:err=>{
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Something went wrong!",
          showConfirmButton: false,
          timer: 5000
        });
      }
    })
  }

  onUpdate(){
    debugger
    var country=new countryDTO();
    country.id=this.Id;
    country.code=this.countryForm.value["txtCode"]
    country.name= this.countryForm.value["txtName"]

    this.CountryService.Update(country).subscribe({
      next:data=>console.log("success"),
      error:err=>console.log(err)
    })
  }
}
