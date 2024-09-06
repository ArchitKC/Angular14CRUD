import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  template: `
    <h2>
      contact works!
    </h2>
    <a routerLink="addContact">Add Contact</a><br>
    <a routerLink="editContact/1">Edit Contact</a>

    <div><router-outlet></router-outlet></div>
  `,
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
