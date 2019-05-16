import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ConnectBackendService } from 'src/app/services/connect-backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  /**
   * @param http is an instance of `ConnectBackendService` class that connects to 
   * the backend and 
   * @param router is an instance to use it with `navigate` methode to 
   * navigate the user to another pages 
   */
  constructor(private http: ConnectBackendService, private router: Router) { }

  // the data of the 
  User = {
    firstname : localStorage.firstname,
    lastname: localStorage.lastname,
    id: localStorage.id
  }  

  // Collect the Data from the user Inputs
  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    passwordConfirmation: new FormControl('', Validators.required)
  })


  /**
   * all process when the user click submit button is going here 
   */
  onSubmit() {
    /**
     * check that @param this.password.value is equal to @param this.passwordConfirmation.value
     * or @param this.form.status is Not `VALID`
     */
    if (this.password.value !== this.passwordConfirmation.value || this.form.status != 'VALID') {
      alert('Maybe you have changed some little attributes in the console .. so please reload \r\n the page to get our service in the right way');
    } else {
      this.http.signUpNewUser(this.form.value).subscribe(
        /**
         * handle the data the Observable has returned 
         * @param result is the data as an <any>
         */
        result => {
          /**
           * grap all the date of the new logged in user
           * in the localStorage Object 
           */
          localStorage.setItem('Token', result.token);
          localStorage.setItem('id', result.user.id);
          localStorage.setItem('firstname', result.user.firstName);
          localStorage.setItem('lastname', result.user.lastName);

          /**
           * inintiate the `this.User` for the new Data
           */
          this.User.firstname = localStorage.firstname
          this.User.lastname = localStorage.lastname
          this.User.id = localStorage.id
          /**
           * when the user has complete his registraion process
           * we will route hime to the main or index page 
           */
          this.router.navigate(['']);
        },
        /**
         * if the Observable has come with an error log it 
         * in console 
         * @param error is the `HttpResponseError` instance to log out this error
         */
        error => { console.log(error) }
      )
    }
  }
  get firstName() {
    return this.form.get('firstName')
  }

  get lastName() {
    return this.form.get('lastName')
  }

  get email() {
    return this.form.get('email')
  }

  get password() {
    return this.form.get('password')
  }

  get passwordConfirmation() {
    return this.form.get('passwordConfirmation')
  }
}
