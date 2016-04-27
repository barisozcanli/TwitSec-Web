import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import { HTTP_PROVIDERS }    from 'angular2/http';
import {ExampleService}       from './example.service';

@Component({
	selector: 'form',
	templateUrl: './pages/settings/components/settings.html',
	providers: [HTTP_PROVIDERS,ExampleService]
})

export class SettingsCmp {
	constructor(private _router: Router, private _exampleService: ExampleService) { }

	errorMessage: string;

	gotoDashboard() {
		this._router.navigate(['Home']);
	}

	ngOnInit() { this.postExample(); }

	postExample() {

    this._exampleService.postExample()
                     .subscribe(
                       error =>  this.errorMessage = <any>error);
  }
}
