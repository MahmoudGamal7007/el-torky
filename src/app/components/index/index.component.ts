import { Component, OnInit } from '@angular/core';
import { ConnectBackendService } from '../../services/connect-backend.service'
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {


  /**
   * this variable has an instance of the authenticated user
   * 
   * this data will be coming from register or login component
   */
  User = {
    firstname: localStorage.firstname,
    lastname: localStorage.lastname,
    id: localStorage.id
  }


  Products1: {}[];
  Products2: {}[];


  ngOnInit() {
    this.http.getProducts().subscribe(
      result => {
        this.Products1 = result.products.slice(0, 4)
        this.Products2 = result.products.slice(4)
      },
      error => { console.log(error) }
    )
  }


  headerHeight
  constructor(private http: ConnectBackendService) {
    this.headerHeight = window.outerHeight / 2;
  }


  test() {
    return this.http.test().subscribe(
      result => {console.log(result)},
      err => {console.log(err)}
    )
  }
}
