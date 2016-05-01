export class UserPreferences {
  constructor(
	public newFollowerFollowerCount:number,
	public sendAutoMessageToNewFollower:boolean,
	public newFollowerAutoMessageContent:string,
	public leftFollowerFollowerCount:number,
	public warnWithEmail:boolean,
	public mentionOldFollowerInTweet:boolean,
	public goodByeTweetContent:string,
	public unwantedUsernamePatterns:string[]) {
     }
}
