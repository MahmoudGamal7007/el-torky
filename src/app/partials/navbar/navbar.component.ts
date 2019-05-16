import { Component, Input } from '@angular/core';
import $ from 'jquery'
import { ConnectBackendService } from 'src/app/services/connect-backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private http: ConnectBackendService, private router: Router) {
    $(window).on('scroll', () => {
      if (window.pageYOffset > 1) {
        $('nav').addClass('activateBoxShadow')
      } else {
        $('nav').removeClass('activateBoxShadow')
      }
    })
  }

  /**
   * this input directive gets the value of the Object `User` from the 
   */
  @Input() User

  /**
   * logout the user 
   */
  logout() {

    this.http.logout("").subscribe(
      result => {
        if (result.code === 200) {
          localStorage.clear();
          if (this.router.url.length == 1 || this.router.url.length == 0) {
            window.location.reload()
          } else {
            this.router.navigate(['/'])
          }
        }
      },
      error => { console.log(error) }
    )
  }



}
