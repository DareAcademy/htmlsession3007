import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../services/country.service';
import { countryDTO } from '../model/countryDTO';
import { PatientsService } from '../services/patients.service';
import { patientDTO } from '../model/patientDTO';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.css']
})
export class NewPatientComponent implements OnInit {

  countries!:countryDTO[]

  patientForms!:FormGroup

  constructor(private formBuilder:FormBuilder,
              private countryService:CountryService,
              private patientService:PatientsService){}

  ngOnInit(): void {

  this.patientForms=this.formBuilder.group({
    txtFirstName:['',Validators.required],
    txtLastName:['',Validators.required],
    txtPhone:[''],
    txtDOB:[''],
    ddlCountry:['',Validators.required]
  })


    this.countryService.getAll().subscribe({
      next:data=>{
        debugger
        this.countries=data
      },
      error:err=>console.log(err)
    })
  }

  onSave(){
    debugger
    var obj=new patientDTO();
    obj.firstName=this.patientForms.value["txtFirstName"]
    obj.lastName=this.patientForms.value["txtLastName"]
    obj.phone=this.patientForms.value["txtPhone"]
    obj.dob=this.patientForms.value["txtDOB"]
    obj.country_Id=this.patientForms.value["ddlCountry"]
    this.patientService.Insert(obj).subscribe({
      
      next:data=>console.log("save Successfully"),
      error:err=>console.log(err)
    })
  }

}

