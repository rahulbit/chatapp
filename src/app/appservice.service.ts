import { Injectable } from '@angular/core';
import {Cookie}  from 'ng2-cookies/ng2-cookies'

import {HttpClient , HttpHeaders} from '@angular/common/http'
import {HttpErrorResponse , HttpParams}  from '@angular/common/http'
import {Observable }  from 'rxjs'
import {catchError , tap  }  from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class AppserviceService  {

  public baseUrl='https://chatapi.edwisor.com';

  constructor( public http :HttpClient) { }

  public getUserInfoFromLocalStorage =()=>{
    
   return JSON.parse(localStorage.getItem('userInfo'))
  }

  public setUserInfoFromLocalStorage=(data)=>{
     localStorage.setItem('userInfo', JSON.stringify(data))
  }

  public  signUpFunction=(data) : Observable<any>=>{
         
     const  params = new HttpParams()
    .set('firstName', data.firstName)
    .set('lastName', data.lastName)
    .set('email', data.email)
    .set('mobileNumber' , data.mobileNumber)
    .set('password', data.password)
    .set('apiKey', data.apiKey);


     return this.http.post(`${this.baseUrl}/api/v1/users/signup`, params);

    
  }

  public signInFunction=(data):Observable<any>=>
  {
    const params = new HttpParams()
    .set('email', data.email)
    .set('password', data.password);

      return this.http.post(`${this.baseUrl}/api/v1/users/login`, params)
  }


   public  logOut =(data):Observable<any>=>
   {
     const params = new HttpParams()
     .set('authToken',Cookie.get('authToken'))
     return this.http.post(`${this.baseUrl}/api/v1/users/logout`, params);
   }


}


