import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientCredentials } from 'src/app/models/ClientCredentials';
import { LoginRequest } from 'src/app/models/loginRequest';
import { ClientTradesService } from 'src/app/services/client-trades.service';
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
  emailForm: any;
  constructor(private clientServices:ClientService,private clientTradesService:ClientTradesService, private router: Router ){}

  login(inputEmail:string , inputPswd:string){
    const loginRequest: LoginRequest = {
      email: inputEmail,
      pswd: inputPswd,
    };
    this.clientServices.loginClient(loginRequest).subscribe({
      next: (response:ClientCredentials) => {
        console.log(response.clientId,"Response CLIENT ID of login:");
        this.clientServices.setCreds(response);
        this.clientTradesService.setCreds(response);
        this.router.navigate(['home-page'])
       
      },
      error:(error:any) =>{
        if(error.status===400)
        {
          alert(error.error);
        }
        else if(error.status===500)
        {
          alert("Refused to connect to the server");
        }
        else {
          alert("Server is down, Connection Not Established");
        }
    }
  });
    
  }
  
//   login(inputEmail:string, inputId:string){
//     const matchedEmail =this.clientServices.doesEmailExist(inputEmail)

//     if(matchedEmail){
//       const identificationSet = this.clientServices.getId(inputEmail)
//       identificationSet?.forEach((identification) =>{
//        const value = identification.value
//        if(value===inputId){
//          console.log("Login successfully");
//          this.router.navigate(['home-page', inputEmail])
//        }
//        else{
//         alert("Client Identification is Invalid")
//        }
//     })
//   }
//     else{
//       this.errorMessage ="Invalid email, Sign Up first";
//       alert(this.errorMessage)

//     }
      
  
// }
}
