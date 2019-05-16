import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  constructor() { }

  /**
   * this variable has an instance of the authenticated user
   */
  User = {
    firstname : localStorage.firstname,
    lastname: localStorage.lastname,
    id: localStorage.id
  }

}
