import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private clientServices:ClientService,private router:Router ){}
  
  login(inputEmail:string, inputId:string){
    const matchedEmail =this.clientServices.doesEmailExist(inputEmail)

    if(matchedEmail){
      const identificationSet = this.clientServices.getId(inputEmail)
      identificationSet?.forEach((identification) =>{
       const value = identification.value
       if(value===inputId){
         console.log("Login successfully");
         this.router.navigate(['home-page', inputEmail])
       }
       else{
        alert("Client Identification is Invalid")
       }
    })
  }
    else{
      this.errorMessage ="Invalid email, Sign Up first";
      alert(this.errorMessage)

    }
      
  
}
}
