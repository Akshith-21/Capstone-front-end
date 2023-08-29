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

  constructor(private clientService: ClientService){}

  login(){
    console.log("Login works")
    console.log(this.clientService.getMockData());
  }
}
