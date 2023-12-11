import { Component, OnInit } from '@angular/core';
import { CountryService } from '../services/country.service';
import { countryDTO } from '../model/countryDTO';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

  countries!:countryDTO[]
  constructor(private countryService:CountryService, private router:Router){}
  ngOnInit(): void {
    debugger
    this.fillCountries()
  }

  Delete(Id:number){

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.countryService.Delete(Id).subscribe({
          next:data=>{
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            this.fillCountries()      
        },
          error:err=>console.log(err)
        })


      }
    });

    
  }

  onEdit(Id:number){
    debugger
    this.router.navigate(['/NewCountry'],{queryParams:{id:Id}})
  }

 fillCountries(){
    this.countryService.getAll().subscribe({
      next:data=>{
        debugger
        this.countries=data
      },
      error:err=>console.log(err)
    })
  }
}
