import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { countryDTO } from '../model/countryDTO';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  baseUrl=''
  constructor(private httpClient:HttpClient) {
    this.baseUrl=environment.APIUrl

   }

  Insert(cntDTO:countryDTO):Observable<any>{
   return this.httpClient.post(this.baseUrl+"/api/Countries",cntDTO)
  }

  getAll():Observable<any>{
    return this.httpClient.get(this.baseUrl+'/api/Countries/GetAll')
  }
  Delete(Id:number):Observable<any>{
    return this.httpClient.delete(this.baseUrl+'/api/Countries?Id='+Id)
  }

  Get(id:number):Observable<any>{
    return this.httpClient.get(this.baseUrl+'/api/Countries/Get?Id='+id)
  }

  Update(country:countryDTO):Observable<any>{
    return this.httpClient.put(this.baseUrl+'/api/Countries',country)
  }

}
