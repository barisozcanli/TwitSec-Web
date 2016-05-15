import {Component, OnInit} from 'angular2/core';
import {Router}						from 'angular2/router';
import {Alert} from 'ng2-bootstrap/ng2-bootstrap';
import { HTTP_PROVIDERS }			from 'angular2/http';
import { CORE_DIRECTIVES} from 'angular2/common';
import { DROPDOWN_DIRECTIVES, CAROUSEL_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {UserService}				from '../../../shared/services/user.service';
import {FollowerReport}         	from '../../../shared/models/follower.report';
import {BlockedReport}          from '../../../shared/models/blocked.report';

@Component({
  selector: 'timeline',
  templateUrl: './pages/home/components/timeline.html',
  styleUrls: ['./pages/home/components/timeline.css'],
  directives: [CORE_DIRECTIVES]
})
class TimelineCmp {}

@Component({
  selector: 'chat',
  templateUrl: './pages/home/components/chat.html',
  directives: [CORE_DIRECTIVES, DROPDOWN_DIRECTIVES]
})
class ChatCmp {
	status: { isopen: boolean } = { isopen: false };
}

@Component({
  selector: 'notifications',
  templateUrl: './pages/home/components/notifications.html',
  styleUrls: ['./pages/home/components/home.css'],
  directives: [CORE_DIRECTIVES]
})
class NotificationCmp {}


@Component({
  selector: 'home',
  templateUrl: './pages/home/components/home.html',
  styleUrls: ['./pages/home/components/home.css'],
  directives: [Alert, TimelineCmp, ChatCmp, NotificationCmp, CAROUSEL_DIRECTIVES],
    providers: [HTTP_PROVIDERS, UserService]
})

export class HomeCmp implements OnInit {

	/* Carousel Variable */
	myInterval: number = 5000;
	index: number = 0;

	constructor(private _router: Router, private _userService: UserService) {}

	unfollowerReports:FollowerReport[];
	followerReports:FollowerReport[];
	blockedReports:BlockedReport[];

	ngOnInit() {
		console.log('ngOnInit');
		this._userService.getFollowerReports('UNFOLLOWED', 1)
   				.subscribe(
   					unfollowerReports => this.unfollowerReports = unfollowerReports);

   		this._userService.getFollowerReports('FOLLOWED', 1)
   				.subscribe(
   					followerReports => this.followerReports = followerReports);

   		this._userService.getBlockedUsers(1)
   				.subscribe(
   					blockedReports => this.blockedReports = blockedReports);
    }

    gotoReports() {
		this._router.navigate(['Tables']);
	}
}
