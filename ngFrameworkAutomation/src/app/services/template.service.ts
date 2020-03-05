import { Template } from './../entities/template/template';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { DatePipe } from '@angular/common'; whats this for
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TemplateInfo } from '../entities/templateInfo/template-info';
import { Rating } from '../entities/rating/rating';


@Injectable({
  providedIn: 'root'
})
export class TemplateService {


  private url = environment.baseUrl + 'api/templates';
  constructor(private http: HttpClient, private authSvc: AuthService) { }
  // M e t h o d s
  index(): Observable<TemplateInfo[]> {

    return this.http.get<TemplateInfo[]>(this.url).pipe(
      catchError((err: any) => {
        console.log('templateService.index(): Error retrieving list');
        console.error(err);
        return throwError(err);
      })
    );
  }


  keyword(keyword: string): Observable<TemplateInfo[]> {
    const credentials = this.authSvc.getCredentials();
    const options = {
      headers: {
        Authorization: 'Basic ' + credentials
      }
    };
    return this.http.get<TemplateInfo[]>(this.url + '/search/' + keyword).pipe(
      catchError((err: any) => {
        console.log('templateService.index(): Error retrieving list');
        console.error(err);
        return throwError(err);
      })
    );
  }

  show(id: number): Observable<Template> {
    const credentials = this.authSvc.getCredentials();
    /*
    If the user has credentials, use the credentials
    otherwise dont use any headers

    */
    let options = {};

    if (credentials) {
      options = {
        headers: {
          Authorization: 'Basic ' + credentials
        }
      };
    }

    return this.http.get<Template>(this.url + '/' + id, options).pipe(
      catchError((err: any) => {
        console.log('templateService.show(): Error retrieving single template');
        console.error(err);
        return throwError(err);
      })
    );
  }
  destroy(id: number) {
    const credentials = this.authSvc.getCredentials();
    const options = {
      headers: {
        Authorization: 'Basic ' + credentials
      }
    };
    return this.http.delete(this.url + '/' + id, options).pipe(
      catchError((err: any) => {
        console.log('templateService.destroy(): Error deleting template');
        console.error(err);
        return throwError(err);
      })
    );
  }
  create(template: Template): Observable<Template> {
    const credentials = this.authSvc.getCredentials();
    const options = {
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Basic ' + credentials
      }
    };
    return this.http.post<Template>(this.url, template, options).pipe(
      catchError((err: any) => {
        console.log('templateService.create(): Error creating template');
        console.error(err);
        return throwError(err);
      })
    );
  }
  update(template: Template): Observable<Template> {
    const credentials = this.authSvc.getCredentials();
    const options = {
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Basic ' + credentials
      }
    };
    return this.http.put<Template>(this.url + '/' + template.id, template, options).pipe(
      catchError((err: any) => {
        console.log('templateService.update(): Error updating template');
        console.error(err);
        return throwError(err);
      })
    );
  }
  addSubtemplate(id: number, subId: number): Observable<Template> {
    const credentials = this.authSvc.getCredentials();
    const options = {
      headers: {
        Authorization: 'Basic ' + credentials
      }
    };
    return this.http.put<Template>(this.url + '/' + id + "/subtemplates/" + subId, "", options).pipe(
      catchError((err: any) => {
        console.log('addSubtemplate.update(): Error updating template');
        console.error(err);
        return throwError(err);
      })
    );
  }
  removeSubtemplate(id: number, subId: number): Observable<Template> {
    const credentials = this.authSvc.getCredentials();
    const options = {
      headers: {
        Authorization: 'Basic ' + credentials
      }
    };
    return this.http.delete<Template>(this.url + '/' + id + "/subtemplates/" + subId, options).pipe(
      catchError((err: any) => {
        console.log('addSubtemplate.update(): Error updating template');
        console.error(err);
        return throwError(err);
      })
    );
  }

  likeTemplate(id: number): Observable<string> {
    const credentials = this.authSvc.getCredentials();
    const options = {
      headers: {
        Authorization: 'Basic ' + credentials
      }
    };
    console.log(environment.baseUrl + 'api/me/rating/' + id);
    return this.http.post<string>(environment.baseUrl + 'api/me/rating/' + id, "", options).pipe(
      catchError((err: any) => {
        console.log('liketemplate(): Error adding like to rating');
        console.error(err);
        return throwError(err);
      })
    );
  }

  getTemplateInformation(id: number): Observable<TemplateInfo> {
    const credentials = this.authSvc.getCredentials();
    const options = {
      headers: {
        Authorization: 'Basic ' + credentials
      }
    };
    console.log(environment.baseUrl + 'api/templateInformation/' + id);
    return this.http.get<TemplateInfo>(environment.baseUrl + 'api/templateInformation/' + id, options).pipe(
      catchError((err: any) => {
        console.log('getTemplateInformation(): Error adding like to rating');
        console.error(err);
        return throwError(err);
      })
    );
  }

  getRating(id: number): Observable<Rating> {
    const credentials = this.authSvc.getCredentials();
    const options = {
      headers: {
        Authorization: 'Basic ' + credentials
      }
    };
    console.log(environment.baseUrl + 'api/rating/' + id);
    return this.http.get<Rating>(environment.baseUrl + 'api/rating/' + id, options).pipe(
      catchError((err: any) => {
        console.log('getRating(): Error adding like to rating');
        console.error(err);
        return throwError(err);
      })
    );
  }





}
