import {Injectable}             from 'angular2/core';
import {Http, Response}           from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Observable}          from 'rxjs/Observable';
import {AppSettings}         from '../../appsettings';
import {Token}               from '../models/token';
import {AuthURL}               from '../models/authurl';
import {User}                from '../models/user';
import {BlockedReport}        from '../models/blocked.report';
import {FollowerReport}        from '../models/follower.report';
import {UserPreferences}    from '../models/user.preferences';

@Injectable()
export class UserService {
  constructor (private http: Http) {}

  private _baseurl = AppSettings.API_ENDPOINT;

  getAuthURL (): Observable<AuthURL>  {

    let body = JSON.stringify({ });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = this._baseurl + '/user/authUrl';

    return this.http.post(url, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  login (username: string, password: string): Observable<Token>  {

    let body = JSON.stringify({ 'username': username, 'password':password });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = this._baseurl + '/user/login';

    return this.http.post(url, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  loginWithTwitter (oauthToken: string, verifier: string): Observable<Token>  {

    let body = JSON.stringify({ 'oauthToken': oauthToken, 'verifier':verifier });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = this._baseurl + '/user/loginTwitter';

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

  getBlockedUsers (limit:number): Observable<BlockedReport[]>  {

    //let body = JSON.stringify({ 'authToken': localStorage.getItem('token')});
    let body = JSON.stringify({ 'authToken': localStorage.getItem('token'), 'limit':limit});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = this._baseurl + '/user/getBlockedUsers';

    return this.http.post(url, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

    getBlockedUsersByDay (day:number): Observable<BlockedReport[]>  {

    //let body = JSON.stringify({ 'authToken': localStorage.getItem('token')});
    let body = JSON.stringify({ 'authToken': localStorage.getItem('token'), 'limit':day});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = this._baseurl + '/user/getBlockedUsersByDay';

    return this.http.post(url, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getFollowerReports (followAction:string, limit:number): Observable<FollowerReport[]>  {

    let body = JSON.stringify({ 'authToken': localStorage.getItem('token'), 'followAction':followAction, 'limit':limit});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = this._baseurl + '/user/getFollowerReports';

    return this.http.post(url, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getFollowerReportsByDay (followAction:string, day:number): Observable<FollowerReport[]>  {

    let body = JSON.stringify({ 'authToken': localStorage.getItem('token'), 'followAction':followAction, 'limit':day});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = this._baseurl + '/user/getFollowerReportsByDay';

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

  changeEmail (email: string): Observable<User> {
    let body = JSON.stringify({ 'authToken': localStorage.getItem('token'), 'email': email });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = this._baseurl + '/user/updateUserInfo';

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
