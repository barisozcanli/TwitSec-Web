import {Component} 		from 'angular2/core';
import {Router} 		from 'angular2/router';
import {HTTP_PROVIDERS}	from 'angular2/http';
import {UserService}	from '../../../shared/services/user.service';
import {Token}          from '../../../shared/models/token';
import {AuthURL}        from '../../../shared/models/authurl';
import {User}           from '../../../shared/models/user';
@Component({
	selector : 'login',
	templateUrl : './pages/login/components/login.html',
	providers: [HTTP_PROVIDERS,UserService]
})

export class LoginCmp {
	constructor( private _router: Router, private _userService: UserService) {}

	errorMessage: string;
	datam: Token;
	user:User;
	authURL:AuthURL;


	login(username:string, password:string) {
		this._userService.login(username, password).subscribe(
						body => this.test(body),
                       error =>  this.errorMessage = <any>error,
                       ()=>this.getUser());
	}
	gotoSignup(url:string) {
		window.location.href=url;
	}

	test(body) {
		this.datam = body;
		localStorage.setItem('token', this.datam.token);
	}

	getTwitterAuthURL() {
		this._userService.getAuthURL()
   				.subscribe(
   					authURL => this.authURL=authURL,
   					error =>  this.errorMessage = <any>error,
   					()=>window.location.href=this.authURL.url);
	}

	getUser() {
		this._userService.getUser()
   				.subscribe(
   					user => this.assignObj(user),
   					error =>  this.errorMessage = <any>error,
   					()=>this._router.navigate(['Dashboard']));
	}

	assignObj(user) {
		this.user = user;
		console.log('assignObj:' + this.user.username);
		localStorage.setItem('connectedUserName', this.user.username);
    }

}
