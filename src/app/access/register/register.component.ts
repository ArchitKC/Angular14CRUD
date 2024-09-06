import { HttpErrorResponse } from '@angular/common/http';
import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  respData:any;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  redirectLogin() {
    this.router.navigate(['login']);
  }

  reactiveform = new FormGroup({
    userId: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
    userEmail: new FormControl('', Validators.required),
    userPassword: new FormControl('', Validators.compose([Validators.required, Validators.email])),
  })

  saveUser() {
    this.userService.registerUser(this.reactiveform.value).subscribe(item => {
      this.respData = item;
      if(this.respData.result=='pass'){
        this.redirectLogin();
      }else{
        alert("Unsuccessful");
      }
    });

    this.userService.registerUser2(this.reactiveform.value).subscribe({
      next: (item) => {
        // Handle successful response
        console.log('Registration successful:', item);
      },
      error: (error: HttpErrorResponse) => {
        // Handle error response
        console.error('Error occurred in Function:', error);
        // Optionally, show a message to the user
        alert('Registration failed. Please try again.');
      }
    });
  }

}
