import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {Dropdown, DropdownToggle} from 'ng2-bootstrap/ng2-bootstrap';
import {DROPDOWN_DIRECTIVES, ACCORDION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {RouteConfig,ROUTER_DIRECTIVES,Router} from 'angular2/router';
import { HTTP_PROVIDERS }    from 'angular2/http';
import {UserService}	from '../../../shared/services/user.service';
import {HomeCmp} from '../../../pages/home/components/home';
import {ProfileCmp} from '../../../pages/profile/components/profile';


@Component({
	selector: 'topnav',
	templateUrl: './widgets/topnav/components/topnav.html',
	directives: [Dropdown, DropdownToggle, ROUTER_DIRECTIVES, CORE_DIRECTIVES, ACCORDION_DIRECTIVES],
	viewProviders: [Dropdown, DropdownToggle, DROPDOWN_DIRECTIVES],
	providers:[HTTP_PROVIDERS, UserService]
})
@RouteConfig([
	{ path: '/home', component: HomeCmp, as: 'Home' },
  { path: '/profile', component: ProfileCmp, as: 'Profile' }
])
export class TopNavCmp {
	public oneAtATime:boolean = true;
	public items: Array<any> = [{name:'google',link: 'https://google.com'},{name:'facebook',link: 'https://facebook.com'}];
	public status:Object = {
	    isFirstOpen: true,
	    isFirstDisabled: false
	};
	username:string;

	constructor(private _router: Router, private _userService: UserService) { }
	gotoDashboard() {
		this._router.navigate(['Home']);
	}
	logout() {
		this._userService.logout()
   				.subscribe(
   					()=>this._router.navigate(['Login']));
	}

	ngOnInit() {
		this.username = localStorage.getItem('connectedUserName');
		/*console.log('localstorage'+localStorage.getItem('connectedUserName'));
		console.log('user'+this.username);*/
    }
}
