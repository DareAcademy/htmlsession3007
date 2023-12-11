import { Component, ElementRef, ViewChild } from '@angular/core';
import { PatientsService } from '../services/patients.service';
import { patientDTO } from '../model/patientDTO';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent {

  patients!:patientDTO[]
  @ViewChild('txtSearchPatienName') PatienName!:ElementRef

  constructor(private patientService:PatientsService){}

  onSearch(){
    
    this.patientService.Search(this.PatienName.nativeElement.value).subscribe({
      next:data=>{
        debugger
        this.patients=data
      },
      error:err=>console.log("error")
    })
  }
}
