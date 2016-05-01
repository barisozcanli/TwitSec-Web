import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import { HTTP_PROVIDERS }    from 'angular2/http';
import {UserService}	from '../../../shared/services/user.service';
import {User}           from '../../../shared/models/user';
import {UserPreferences}           from '../../../shared/models/user.preferences';
import {
    BUTTON_DIRECTIVES}
from 'ng2-bootstrap/ng2-bootstrap';

@Component({
	selector: 'form',
	templateUrl: './pages/settings/components/settings.html',
	providers: [HTTP_PROVIDERS,UserService],
	directives:[BUTTON_DIRECTIVES]
})

export class SettingsCmp implements OnInit {
	constructor(private _router: Router, private _userService: UserService) { }
	sendAutoMessageToNewFollowerRadioModel:string = 'true';
	warnWithEmailRadioModel:string = 'true';
	mentionOldFollowerInTweetRadioModel:string = 'true';
	errorMessage: string;
	user: User;
	preferences:UserPreferences;
	gotoDashboard() {
		this._router.navigate(['Home']);
	}

	ngOnInit() {
		console.log('ngOnInit');
		this._userService.getUser()
   				.subscribe(
   					user => this.assignObj(user),
   					error =>  this.errorMessage = <any>error);
    }

    updatePreferences() {
    	this.user.preferences.sendAutoMessageToNewFollower = (this.sendAutoMessageToNewFollowerRadioModel === 'true');
    	this.user.preferences.warnWithEmail = (this.warnWithEmailRadioModel === 'true');
    	this.user.preferences.mentionOldFollowerInTweet = (this.mentionOldFollowerInTweetRadioModel === 'true');

    	this._userService.updatePreferences(this.user.preferences)
    			.subscribe(userPreferences=> this.preferences=userPreferences,
    					error =>  this.errorMessage = <any>error);
    }

    assignObj(user) {
    	this.user=user;
    	console.log('JSON :'+JSON.stringify({ 'authToken': localStorage.getItem('token')}));
    	console.log('JSON :'+JSON.stringify(this.user.preferences));

    	let test = JSON.parse(JSON.stringify(this.user.preferences));
    	test.authToken = 'sdfsdf';
		console.log('testJSON :'+JSON.stringify(test));
		this.sendAutoMessageToNewFollowerRadioModel = this.user.preferences.sendAutoMessageToNewFollower.toString();
		this.warnWithEmailRadioModel = this.user.preferences.warnWithEmail.toString();
		this.mentionOldFollowerInTweetRadioModel = this.user.preferences.mentionOldFollowerInTweet.toString();
    }
}
