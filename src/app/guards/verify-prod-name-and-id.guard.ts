import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ConnectBackendService } from '../services/connect-backend.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyProdNameAndIdGuard implements CanActivate {

  // Constructor
  constructor(private http: ConnectBackendService, private router: Router) { }

  // implement the guard
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {

    let urlToBackEnd = next.url[0].path + "/" + next.url[1].path + "/" + next.url[2].path

    /**
     * @param urlToBackEnd is the path that will be passed to `getProdNameAndId`
     */
    const value = await new Promise((resolve) => {
      resolve(this.http.getProdNameAndId(urlToBackEnd).toPromise());
    });
    if(value == true){
      return value 
    } else {
      this.router.navigateByUrl('/')
      return value;
    }
  }
}
