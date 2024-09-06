import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModel } from '../material.module';
import { FormsModule } from '@angular/forms';
import { UserService } from '../Service/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MaterialModel, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  respData:any

  userLogin(myLoginForm:any){
    if(myLoginForm.valid){ 
        this.userService.userLogin(myLoginForm.value).subscribe({
          next: (item) => {
            // Handle successful response
            console.log('Login successful:', item);
            this.respData = item;
            localStorage.setItem('token',this.respData.jwtToken);
            this.router.navigate(['home']);
          },
          error: (error: HttpErrorResponse) => {
            // Handle error response
            console.error('Error occurred in Login Function:', error);
            // Optionally, show a message to the user
            alert('Login failed. Please try again.');
          }
        });
    }   
  }

  redirectRegister(){
    this.router.navigate(['access/register']);
  }
}