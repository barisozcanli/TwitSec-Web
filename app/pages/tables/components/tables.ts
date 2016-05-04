import {Component, OnInit}			from 'angular2/core';
import {Router}						from 'angular2/router';
import { HTTP_PROVIDERS }			from 'angular2/http';
import {UserService}				from '../../../shared/services/user.service';
import {BUTTON_DIRECTIVES}			from 'ng2-bootstrap/ng2-bootstrap';
import {FollowerReport}         	from '../../../shared/models/follower.report';

@Component({
	selector: 'tables',
	templateUrl: './pages/tables/components/tables.html',
	providers: [HTTP_PROVIDERS,UserService],
	directives:[BUTTON_DIRECTIVES]
})

export class TableCmp implements OnInit {
	constructor(private _router: Router, private _userService: UserService) { }

	errorMessage: string;
	unfollowerReports:FollowerReport[];
	followerReports:FollowerReport[];
	gotoDashboard() {
		this._router.navigate(['Home']);
	}

	ngOnInit() {
		console.log('ngOnInit');
		this._userService.getFollowerReports('UNFOLLOWED', 10)
   				.subscribe(
   					unfollowerReports => this.unfollowerReports = unfollowerReports);

   		this._userService.getFollowerReports('FOLLOWED', 10)
   				.subscribe(
   					followerReports => this.followerReports = followerReports);
    }

}
