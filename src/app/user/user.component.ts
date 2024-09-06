import { Component, OnInit } from '@angular/core';
import { UserService } from '../Service/user.service';
import { userModel } from '../Model/userModel';
import { HttpErrorResponse } from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  responseData:userModel = {
    id: '',
    email: '',
    first_name: '',
    last_name: '',
    avatar: ''
  };
  displayedColumns: string[] = ['id', 'email', 'first_name', 'last_name', 'avatar'];
  dataSource = new MatTableDataSource<userModel>([]);
  getAllUser:any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(){
    this.userService.getUser().subscribe({
      next:(item) =>{ 
        this.getAllUser=item;
        this.dataSource = new MatTableDataSource<userModel>(this.getAllUser.data);
        console.log(this.dataSource);
      },
      error:(error:HttpErrorResponse) => {
        // Handle error response
        console.error('Error occurred in Fetching Data:', error);
      }
  });
  }

}
