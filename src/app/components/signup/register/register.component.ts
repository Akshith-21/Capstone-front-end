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

  constructor(private clientService: ClientService, private router:Router) {}
  
  public idTypes = new Map([
    ['', []],
    ['India', ['Aadhaar No.', 'PAN No.', 'Passport No.']],
    ['USA', ['SSN No.', 'Passport No.']],
    ['Ireland', ['PPS No.', 'Passport No.']]
  ]);

   
  showAdditionalField?: boolean = false;
  emailExist?: boolean = false;
  emailCheck?:boolean = false;
  country?:string;

  person = new Person("","","","","");
  clientIdentification = new ClientIdentification("","");


  addClient(){

    const clientData = {
      person: {
        email: this.person.email,
        id: "",
        dateOfBirth: this.person.dateOfBirth,
        country: this.person.country,
        postalCode: this.person.postalCode,
      },
      clientIdentificationSet: [
        {
          type: this.clientIdentification.type,
          value: this.clientIdentification.value,
        },
      ],
    };

    this.clientService.addClient(clientData).subscribe({ 
      next: (response) => {
        console.log(response);
        this.emailCheck=true;
        if (this.emailCheck) {
          const email = clientData.person.email; 
          console.log("in existCheck", email);   
             this.router.navigate(['/preference', email]); 
        }
      },
      error: (error) => {
        if (error.status === 400) {
          this.emailExist = true;
          this.emailCheck= false;
          alert('Email Already exist, Please login ' + error.error);
      }
    }
  });

   }
  


  



  // addClient(){
  //   this.clientService.addClient(this.person,this.clientIdentification);
  //   this.emailCheck = true;
  //   this.person.id = this.clientService.generateUniqueId(this.person.email);
  //   console.log('inside register' + this.person);
  // }



}
