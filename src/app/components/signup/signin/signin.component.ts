import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientIdentification } from 'src/app/models/clientIdentification';
import { Person } from 'src/app/models/person';
import { SignupService } from 'src/app/services/signup.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  // emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  // name = new FormControl('');
  // DOB= new FormControl('');
  // postalCode = new FormControl('');

  // userDetails = new FormGroup({
  //   email: new FormControl('',[
  //     Validators.required,
  //     Validators.pattern(this.emailPattern)
  //   ]),
    
  // })

  // get getEmail(){
  //   return this.userDetails.get('email');

  // }
  
  
  person = new Person("","","","","");
  
  showAdditionalField?: boolean = false;
  emailexist?: boolean = false;
  emailCheck?:boolean = false;
  country?:string;
  clientIdentification = new ClientIdentification("","");
  onCountryChange(){
    console.log("HRHK")
    console.log(this.person.email)
    console.log(this.person.dateOfBirth)
   // this.showAdditionalField = true;
    console.log(this.person.country);
    if(this.person.country === 'India')
      {
        this.showAdditionalField = true;
        this.clientIdentification.type = "Indian-Identification-Number";
      }
      else if(this.person.country === 'USA')
      {
        this.showAdditionalField = true;
        this.clientIdentification.type = "USA-Identification-Number";
      }
      else if(this.person.country === 'Ireland')
      {
        this.showAdditionalField = true;
        this.clientIdentification.type = "Ireland-Identification-Number";
      }
    else {
      this.showAdditionalField = false;
    }
  }

  verifyEmail() {
    this.emailCheck = false
     this.emailexist = (this.signupService.verifyEmail(this.person.email));
     if(!this.emailexist){
       this.addClient();
     }

  }

  addClient(){
    this.signupService.addClient(this.person,this.clientIdentification);
    this.emailCheck = true;
  }

  constructor(private signupService: SignupService) {}


}
