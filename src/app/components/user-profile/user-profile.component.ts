import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  @Input() email:any
  showUserInfo:boolean =false
  ngOnInit(){
    console.log("In user", this.email)
  }

  toggleUserInfo(){
  this.showUserInfo=!this.showUserInfo
}
}
