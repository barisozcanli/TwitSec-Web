import {Component} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {HTTP_PROVIDERS}	from 'angular2/http';
import {UserService}	from '../../../shared/services/user.service';
import {Token}          from '../../../shared/models/token';
import {User}           from '../../../shared/models/user';

@Component({
	selector: 'login',
	templateUrl: './pages/login-twitter/components/login.twitter.html',
	providers: [HTTP_PROVIDERS,UserService]
})

export class LoginTwitterCmp {
	errorMessage: string;
	datam: Token;
	user:User;
	constructor( private _router: Router, private _params:RouteParams, private _userService: UserService) {
	}

	ngOnInit() {
		var oauth_token = this._params.get('oauth_token');
		var oauth_verifier = this._params.get('oauth_verifier');

		this._userService.loginWithTwitter(oauth_token, oauth_verifier).subscribe(
						body => this.test(body),
                       error =>  this.errorMessage = <any>error,
                       ()=>this.getUser());

    }

   	test(body) {
		this.datam = body;
		localStorage.setItem('token', this.datam.token);
	}

    getUser() {
		this._userService.getUser()
   				.subscribe(
   					user => this.assignObj(user),
   					error =>  this.errorMessage = <any>error,
   					()=>location.href=location.origin+location.pathname+'#dashboard');
	}

	assignObj(user) {
		this.user = user;
		console.log('assignObj:' + this.user.username);
		localStorage.setItem('connectedUserName', this.user.username);
    }
}
