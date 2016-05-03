import {Injectable}             from 'angular2/core';
import {Http, Response}           from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Observable}          from 'rxjs/Observable';
import {AppSettings}         from '../../appsettings';
import {Token}               from '../models/token';
import {User}                from '../models/user';
import {BlockedReport}        from '../models/blocked.report';
import {UserPreferences}    from '../models/user.preferences';

@Injectable()
export class UserService {
  constructor (private http: Http) {}

  private _baseurl = AppSettings.API_ENDPOINT;

  login (username: string, password: string): Observable<Token>  {

    let body = JSON.stringify({ 'username': username, 'password':password });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = this._baseurl + '/user/login';

    return this.http.post(url, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  logout (): Observable<User>  {

    let body = JSON.stringify({ 'authToken': localStorage.getItem('token')});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = this._baseurl + '/user/logout';

    return this.http.post(url, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getUser (): Observable<User>  {

    let body = JSON.stringify({ 'authToken': localStorage.getItem('token')});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = this._baseurl + '/user/get';

    return this.http.post(url, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getBlockedUsers (): Observable<BlockedReport[]>  {

    let body = JSON.stringify({ 'authToken': localStorage.getItem('token')});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = this._baseurl + '/user/getBlockedUsers';

    return this.http.post(url, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  updatePreferences (preferences:UserPreferences): Observable<UserPreferences>  {
      var body = JSON.parse('{}');
      body.authToken = JSON.parse(JSON.stringify(localStorage.getItem('token')));
      body.userPreferences = JSON.parse(JSON.stringify(preferences));

      body = JSON.stringify(body);
      console.log('jsonbody : '+body);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let url = this._baseurl + '/user/updateUserPreferences';

      return this.http.post(url, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    console.log('userservice :' + JSON.stringify(body));
    return body || { };
  }

  private handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
