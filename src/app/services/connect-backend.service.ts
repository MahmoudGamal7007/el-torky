import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnectBackendService {
  baseURL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem('Token')
  }

  logout(data?: string): Observable<any> {
    return this.http.post(`${this.baseURL}/logout`, data);
  }

  signUpNewUser(User): Observable<any> {
    return this.http.post(`${this.baseURL}/register`, User)
  }

  login(data): Observable<any> {
    return this.http.post(`${this.baseURL}/login`, data)
  }


  sendRequest() {
    return this.http.get(`${this.baseURL}/test`)
  }

  uploadFile(files: any): Observable<any> {
    return this.http.post(`${this.baseURL}/product/upload`, files, {reportProgress: true, observe: "events"})
  }

  isLoggedIn() {
    return !!localStorage.getItem('Token');
  }

  getProducts(): Observable<any>{
    return this.http.get(`${this.baseURL}/getProducts`)
  }


  // this methode will be invoked by VerifyProdNameAndIdGuard class
  getProdNameAndId(root): Observable<any>{
    return this.http.get(`${this.baseURL}/${root}`)
  }
  
  addComment(body, user_id, prod_id){
    return this.http.get(`${this.baseURL}/addComment?body=${body}&user_id=${user_id}&prod_id=${prod_id}`)
  }

  getComments(prod_id: number): Observable<any>{
    return this.http.get(`${this.baseURL}/getComments?prod_id=${prod_id}`)
  }

  test(): Observable<Object>{
    return this.http.get('https://eltorky--mahmoud-gamal.repl.co')
  }


}
