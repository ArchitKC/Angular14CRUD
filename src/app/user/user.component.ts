import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../Service/user.service';
import { userModel } from '../Model/userModel';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ModalpopupComponent } from '../modalpopup/modalpopup.component';
import {  Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  private subscription: Subscription | undefined;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  displayedColumns: string[] = ['id', 'email', 'first_name', 'last_name', 'avatar', 'action'];
  dataSource = new MatTableDataSource<userModel>([]);
  getAllUser: any;
  getProducts:any;

  constructor(private userService: UserService, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    this.subscription = this.userService.getUser2().subscribe({
      next: (item) => {
        this.getAllUser = item;
        this.dataSource = new MatTableDataSource<userModel>(this.getAllUser.data);
        this.dataSource.paginator = this.paginator;
        // console.log(this.dataSource);
      },
      error: (error: HttpErrorResponse) => {
        // Handle error response
        console.error('Error occurred in Fetching Data:', error);
      }
    });
  }

  functionUpdate(userID: string){
    let popup = this.dialog.open(ModalpopupComponent,{
      width: '400px',
      height:'400px',
      data:{
        userID:userID
      }
    });
  }

  functionDelete(userID:string){}

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
