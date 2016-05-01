import {Component} 		from 'angular2/core';
import {Router} 		from 'angular2/router';
import {HTTP_PROVIDERS}	from 'angular2/http';
import {UserService}	from '../../../shared/services/user.service';
import {Token}           from '../../../shared/models/token';

@Component({
	selector : 'login',
	templateUrl : './pages/login/components/login.html',
	providers: [HTTP_PROVIDERS,UserService]
})

export class LoginCmp {
	constructor( private _router: Router, private _userService: UserService) {}

	errorMessage: string;
	datam: Token;

	login(username:string, password:string) {
		this._userService.login(username, password).subscribe(
						body => this.test(body),
                       error =>  this.errorMessage = <any>error,
                       ()=>this._router.navigate(['Dashboard']));
	}
	gotoSignup() {
		this._router.navigate(['Signup']);
	}

	test(body) {
		console.log('logints: '+ JSON.stringify(body));
		this.datam = body;
		console.log('logints: '+ this.datam.token);
		localStorage.setItem('token', this.datam.token);
	}
}
