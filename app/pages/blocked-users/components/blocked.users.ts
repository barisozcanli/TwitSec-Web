import {Component, OnInit} 		from 'angular2/core';
import {Router} 				from 'angular2/router';
import { HTTP_PROVIDERS }    	from 'angular2/http';
import {UserService}			from '../../../shared/services/user.service';
import {BlockedReport}          from '../../../shared/models/blocked.report';
import {BUTTON_DIRECTIVES}		from 'ng2-bootstrap/ng2-bootstrap';

@Component({
	selector: 'bs-component',
	templateUrl: './pages/blocked-users/components/blocked.users.html',
	providers: [HTTP_PROVIDERS,UserService],
	directives:[BUTTON_DIRECTIVES]
})

export class BlockedUsersCmp implements OnInit {
	constructor(private _router: Router, private _userService: UserService) { }
	errorMessage: string;
	blockedReports:BlockedReport[];
	gotoDashboard() {
		this._router.navigate(['Home']);
	}

	ngOnInit() {
		this.getBlockedUsers();
    }

	getBlockedUsers() {
    	this._userService.getBlockedUsers(10)
   				.subscribe(
   					blockedReports => this.assignObj(blockedReports),
   					error =>  this.errorMessage = <any>error);
    }

    assignObj(blockedReports) {
    	this.blockedReports = blockedReports;
    	//console.log('JSON :'+JSON.stringify(this.blockedReports));
    }
}
