import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ConnectBackendService } from 'src/app/services/connect-backend.service';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(private http: ConnectBackendService, private meta: Meta, private router: Router) {}

  ngOnInit() {
  }

  onSubmit(){
    return this.http.login(this.form.value).subscribe(
      result => {
        /**
         * store the coming token into the `localStorage` object
         * @param Token is the key of the token 
         * @param result.token is the token it self
         */
        localStorage.setItem('Token', result.token)
        localStorage.setItem('id', result.user.id)
        localStorage.setItem('firstname', result.user.firstname)
        localStorage.setItem('lastname', result.user.lastname)
        this.router.navigate(['/'])
      },
      error => {console.log(error)}
    )
  }


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

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(8), Validators.max(24)])
  })

  get email(){
    return this.form.get('email');
  }

  get password(){
    return this.form.get('password');
  }
}
