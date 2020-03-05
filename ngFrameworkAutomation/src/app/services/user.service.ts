import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { User } from '../entities/user/user';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // fields
  url = environment.baseUrl + 'api/me';

  adminUrl = environment.baseUrl + 'api/users';



  // Inject the HttpClient
  constructor(private http: HttpClient, private authSvc: AuthService) { }

  // methods

  getUser(): Observable<User> {
    const credentials = this.authSvc.getCredentials();
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`
      })
    };

    return this.http.get<User>(this.url, httpOptions).pipe(
      catchError((err: any) => {
        console.log('userService.index(): Error Retrieving user');
        console.error(err);
        return throwError(err);
      })
    )
  }

  getAllUsers(): Observable<User[]> {
    const credentials = this.authSvc.getCredentials();
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`
      })
    };

    return this.http.get<User[]>(this.adminUrl, httpOptions).pipe(
      catchError((err: any) => {
        console.log('userService.getAllUsers(): Error Retrieving user list');
        console.error(err);
        return throwError(err);
      })
    )
  }

  deactivateUser(user: User): Observable<boolean> {
    const credentials = this.authSvc.getCredentials();
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`
      })
    };

    return this.http.delete<boolean>(this.adminUrl + '/' + user.username, httpOptions).pipe(
      catchError((err: any) => {
        console.log('userService.deactivateUser(): Error deactivating user');
        console.error(err);
        return throwError(err);
      })
    )
  }

  activateUser(user: User): Observable<boolean> {
    const credentials = this.authSvc.getCredentials();
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`
      })
    };

    return this.http.put<boolean>(this.adminUrl + '/' + user.username, '', httpOptions).pipe(
      catchError((err: any) => {
        console.log('userService.activateUser(): Error activating user');
        console.error(err);
        return throwError(err);
      })
    )
  }

  updateUser(user: User): Observable<User> {
    const credentials = this.authSvc.getCredentials();
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`
      })
    };

    return this.http.put<User>(this.url, user, httpOptions).pipe(
      catchError((err: any) => {
        console.log('userService.index(): Error updating user');
        console.error(err);
        return throwError(err);
      })
    )
  }

}


