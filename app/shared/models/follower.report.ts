import {TwitterUser}		from './twitter.user';
import {User}				from './user';

export class FollowerReport {
  constructor(
	public id:string,
	public user:User,
	public twitterId:number,
	public twitterUser:TwitterUser,
	public createdAt:Date,
	public followAction:string) {
     }
}
