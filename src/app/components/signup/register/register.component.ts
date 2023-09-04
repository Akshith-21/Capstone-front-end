import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientIdentification } from 'src/app/models/clientIdentification';
import { Person } from 'src/app/models/person';
import { ClientService } from 'src/app/services/client.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  public idTypes = new Map([
    ['', []],
    ['India', ['Aadhaar No.', 'PAN No.', 'Passport No.']],
    ['USA', ['SSN No.', 'Passport No.']],
    ['Ireland', ['PPS No.', 'Passport No.']]
  ]);
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
     this.emailexist = (this.clientService.verifyEmail(this.person.email));
     if(!this.emailexist){
       this.addClient();
       this.router.navigate(['/preference',this.person.email])
     }
    

  }

  addClient(){
    this.clientService.addClient(this.person,this.clientIdentification);
    this.emailCheck = true;
    this.person.id = this.clientService.generateUniqueId(this.person.email);
    console.log(this.person);
  }

  constructor(private clientService: ClientService, private router:Router) {}


}
