import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { patientDTO } from '../model/patientDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(private httpClient:HttpClient) { }

  Insert(patientDTO:patientDTO):Observable<any>{
    return this.httpClient.post('http://localhost/ClinicAPI3007/api/Patient',patientDTO)
  }

  Search(name:string):Observable<any>{
    return this.httpClient.get('http://localhost/ClinicAPI3007/api/Patient?Name='+name)
  }
}
