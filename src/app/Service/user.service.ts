import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';  // This will allow you to return a fallback observable
import { HttpErrorResponse } from '@angular/common/http';
import { userModel } from '../Model/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpUrl = 'https://reqres.in';
  constructor(private httpClient: HttpClient ) { }

  userLogin(inputData:any){
    return this.httpClient.post(this.httpUrl + '/api/login', inputData)
  }

  isLoggedIn(){
    return localStorage.getItem('token') != null;
  }

  getToken(){
    return localStorage.getItem('token') != null?localStorage.getItem('token'):'';
  }

  registerUser(inputData:any){
    return this.httpClient.post(this.httpUrl + '/api/register', inputData).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the error here
        console.error('Error occurred:', error);
        
        // Return a fallback value or an observable (you can modify this as per your needs)
        return of({ success: false, message: 'Registration failed due to server error.' });
      })
    );
  }

  registerUser2(inputData:any){
    return this.httpClient.post('url', inputData)
  }

  getUser():Observable<userModel[]>{
    return this.httpClient.get<userModel[]>(this.httpUrl+'/api/users?page=2').pipe(
      catchError((error: HttpErrorResponse) => {
        console.error("Cannot fetch:" + error)

        return of([] as userModel[]);
      })
    );
  }
}
