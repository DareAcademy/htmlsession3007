import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewCountryComponent } from './new-country/new-country.component';
import { CountryListComponent } from './country-list/country-list.component';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient,HttpClientModule} from '@angular/common/http';
import { AddUsersComponent } from './add-users/add-users.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewRoleComponent } from './new-role/new-role.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { AuthenticationInterceptor } from './Interceptors/authentication.interceptor';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateService} from "@ngx-translate/core";
import { ErrorhandlingInterceptor } from './Interceptors/errorhandling.interceptor';
import { Error404Component } from './error404/error404.component';
import { Error401Component } from './error401/error401.component';

@NgModule({
  declarations: [
    AppComponent,
    NewCountryComponent,
    CountryListComponent,
    NewPatientComponent,
    PatientListComponent,
    AddUsersComponent,
    LoginComponent,
    DashboardComponent,
    NewRoleComponent,
    UserListComponent,
    UserRolesComponent,
    Error404Component,
    Error401Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthenticationInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorhandlingInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private translate: TranslateService){
    translate.use('en');
  }

 }
    
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http,'./assets/i18n/','.json');
}