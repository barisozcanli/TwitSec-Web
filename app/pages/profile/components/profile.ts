import {Component} from 'angular2/core';
import {Router} 		from 'angular2/router';
import {HTTP_PROVIDERS}	from 'angular2/http';
import {UserService}	from '../../../shared/services/user.service';
import {User}           from '../../../shared/models/user';
//import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
	selector: 'profile',
	templateUrl: './pages/profile/components/profile.html',
  providers: [HTTP_PROVIDERS, UserService/*, ToastsManager*/]
})

export class ProfileCmp {
  constructor( private _router: Router, private _userService: UserService/*, public toastr: ToastsManager*/) {}

  errorMessage: string;
  user: User;

  changeEmail() {
    this._userService.changeEmail(this.user.email).subscribe(
              user => this.user = user,
              error => this.errorMessage = <any>error,
              () => this.successMsg()
    );

  }

  successMsg() {
      console.log('toastr start');
      //this.toastr.success('User email updated!', 'Success');
      console.log('toastr end');
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
