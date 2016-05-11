import {Component} from 'angular2/core';
import {Router} 		from 'angular2/router';
import {HTTP_PROVIDERS}	from 'angular2/http';
import {UserService}	from '../../../shared/services/user.service';
import {User}           from '../../../shared/models/user';

@Component({
	selector: 'profile',
	templateUrl: './pages/profile/components/profile.html',
  providers: [HTTP_PROVIDERS, UserService]
})

export class ProfileCmp {
  constructor( private _router: Router, private _userService: UserService) {}

  errorMessage: string;
  user: User;

  changeEmail() {
    this._userService.changeEmail(this.user.email).subscribe(
              user => this.user = user,
              error => this.errorMessage = <any>error
    );

  }

  ngOnInit() {
    this._userService.getUser()
           .subscribe(
             user => this.assignObj(user),
             error =>  this.errorMessage = <any>error);
    }

  assignObj(user) {
      this.user=user;
  }
}
