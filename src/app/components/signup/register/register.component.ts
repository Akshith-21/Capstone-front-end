import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    ['India', ['Aadhaar No.', 'PAN No.']],
    ['USA', ['SSN No.', 'Passport No.']],
    ['Ireland', []]
  ]);
  
  person = new Person("","","","","");
  
  showAdditionalField?: boolean = false;
  emailexist?: boolean = false;
  emailCheck?:boolean = false;
  country?:string;
  clientIdentification = new ClientIdentification("","");


  verifyEmailAndIdentification() {
    this.emailCheck = false
     this.emailexist = (this.clientService.verifyEmailAndIdentification(this.person.email,this.clientIdentification.value));
     if(!this.emailexist){
       this.addClient();
     }

  }

  addClient(){
    this.clientService.addClient(this.person,this.clientIdentification);
    this.emailCheck = true;
    this.person.id = this.clientService.generateUniqueId(this.person.email);
    console.log(this.person.id);
  }

  constructor(private clientService: ClientService) {}


}
