export class TwitterUser {
  constructor(
	public twitterId:number,
	public screenName:string,
	public name:string,
	public followersCount:number,
	public friendsCount:number,
	public miniProfileImageURL:string,
	public profileImageURL:string,
	public biggerProfileImageURL:string,
	public originalProfileImageURL:string,
	public description:string,
	public profileBackgroundColor:string,
	public profileBackgroundImageURL:string,
	public profileTextColor:string,
	public URL:string) {
     }
}
