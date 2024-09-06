import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status',
  template: `
    <h2>
      404 Error, Page Not Found
    </h2>
  `,
  styles: [
    "h2{color:red; font-size:40px}"
  ]
})
export class StatusComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
