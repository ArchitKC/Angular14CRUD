import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  
  title = 'Angular14CRUD';
  isMenuVisible: boolean=true;

  constructor(private router:Router){}
  ngDoCheck(): void {
    const currentUrl = this.router.url
    if(currentUrl == '/login'){
      this.isMenuVisible = false;
    }else{
      this.isMenuVisible=true;
    }
  }
}
