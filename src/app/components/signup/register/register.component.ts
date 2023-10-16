import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClientIdentification } from 'src/app/models/clientIdentification';
import { Person } from 'src/app/models/person';
import { ClientTradesService } from 'src/app/services/client-trades.service';
import { ClientService } from 'src/app/services/client.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private snackBar:MatSnackBar, private clientService: ClientService, private clientTradesService: ClientTradesService, private router:Router) {}
  
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
          this.clientService.setCreds(response);
          this.clientTradesService.setCreds(response);
          console.log("Creds set: ", this.clientTradesService.authCreds);
          this.router.navigate(['/preference']); 
          this.openSnackBar('Registration successful!', 'ok');
        }
      },
      error: (error) => {
        if (error.status === 400 || error.status ===500) {
          this.emailExist = true;
          this.emailCheck= false;
          console.log('Email Already exist, Please login ' + error.error);
          this.openSnackBar('Email or ID already exists! Please Login', 'error');
      }
    }
  });

   }

   openSnackBar(msg: string, status: string) {
    const horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    const verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    this.snackBar.open(msg, 'Close', {
      duration: 5000,
      horizontalPosition,
      verticalPosition,
      panelClass: [status+ '-snack'],
    });
  }


}
