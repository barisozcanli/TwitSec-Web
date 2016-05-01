import {Token}				from './token';
import {Follower}			from './follower';
import {UserPreferences}	from './user.preferences';

export class User {
  constructor(
	public id:string,
	public username:string,
	public email:string,
	public password:string,
	public token:Token,
	public followers:Follower[],
	public preferences:UserPreferences) {
     }
}
