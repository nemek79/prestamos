import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intermediarios',
  templateUrl: './intermediarios.component.html',
  styleUrls: ['./intermediarios.component.scss']
})
export class IntermediariosComponent implements OnInit {

  users: User[];
  cols: any[];

  constructor() { }

  ngOnInit() {

    this.users = [
      { id: '1', name: 'kiran',email:'kiran@gmail.com' },
      { id: '2', name: 'tom',email:'tom@gmail.com' },
      { id: '3', name: 'john',email:'john@gmail.com' },
      { id: '4', name: 'Frank',email:'frank@gmail.com' },

    ];
    this.cols = [
        { field: 'id', header: 'Id' },
        { field: 'name', header: 'Name' },
        { field: 'email', header: 'Email' },
    ];
  }

}

export interface User {  
  id;  
  name;  
  email;  
}  
