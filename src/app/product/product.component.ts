import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { productsModel, userModel } from '../Model/userModel';
import { UserService } from '../Service/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalpopupComponent } from '../modalpopup/modalpopup.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private subscription: Subscription | undefined;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  displayedColumns: string[] = ['name', 'quantity', 'price'];
  dataSource = new MatTableDataSource<productsModel>([]);
  getAllUser: any;
  getProducts:any;

  constructor(private userService: UserService, private dialog:MatDialog) { }

  ngOnInit(): void { 
    this.getProductDetails();
  }

  getProductDetails(){
    this.subscription = this.userService.getProduct().subscribe({
      next:(item)=>{
        this.getProducts = item;
        this.dataSource = new MatTableDataSource<productsModel>(this.getProducts);
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource);
      },
      error:(error:HttpErrorResponse)=>{
        console.error('Error occurred in Fetching Products:', error);
      }
    });
  }

  getUserDetails() {
    this.subscription = this.userService.getUser().subscribe({
      next: (item) => {
        this.getAllUser = item;
        // this.dataSource = new MatTableDataSource<userModel>(this.getAllUser.data);
        // this.dataSource.paginator = this.paginator;
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
