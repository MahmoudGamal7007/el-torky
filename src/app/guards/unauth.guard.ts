import { Injectable} from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { ConnectBackendService } from '../services/connect-backend.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {
  constructor(private http: ConnectBackendService, private router: Router){}
  canActivate(): boolean{
    if(!this.http.isLoggedIn()){
      return true;
    } else {
      this.router.navigate(['/'])
      return false
    }
  }
}
