import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:string='';
  password:string='';
  errorMessage:string='';
  constructor(private clientServices:ClientService ){}

  login(inputEmail:string){
    const matchedEmail =this.clientServices.client.find(emailObj =>emailObj.email===inputEmail)
    if(!matchedEmail ){
      this.errorMessage =" Invalid email, Sign Up first";
      alert(this.errorMessage)
    }
  }
}
