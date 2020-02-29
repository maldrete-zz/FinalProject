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



  // Inject the HttpClient
  constructor(private http: HttpClient, private authSvc: AuthService) { }

  // methods

  getUser(): Observable<User>{
    const credentials = this.authSvc.getCredentials();
    let httpOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`
      })
    };

    return this.http.get<User>(this.url, httpOptions).pipe(
      catchError( (err: any) => {
        console.log('userService.index(): Error Retrieving user');
        console.error(err);
        return throwError(err);
      })
    )
  }

}


