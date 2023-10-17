
import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClientCredentials } from 'src/app/models/ClientCredentials';
import { LoginRequest } from 'src/app/models/loginRequest';
import { Token } from 'src/app/models/token';
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
  constructor(private snackBar:MatSnackBar, private clientServices:ClientService,private clientTradesService:ClientTradesService, private router: Router ){}

  ngOnInit() {
    this.clientServices.deleteTokenInCookie();
    this.router.navigate(['login']);
  }

  login(inputEmail:string , inputPswd:string){
    const loginRequest: LoginRequest = {
      email: inputEmail,
      pswd: inputPswd,
    };
    this.clientServices.loginClient(loginRequest).subscribe({
      next: (response:Token) => {
        console.log(response.token,"Response token ID of login:");
        this.clientServices.setCreds(response.token);
        this.clientTradesService.setCreds(this.clientServices.getCred());
        this.router.navigate(['home-page'])
       
      },
      error:(error:any) =>{
        if(error.status===400 || error.status ===500)
        {
          this.openSnackBar(error.error, 'error');
        }
        else if(error.status===500)
        {
          this.openSnackBar("Refused to connect to the server", 'error');
        }
        else {
          this.openSnackBar("Server is down, Connection Not Established", 'error');
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
      panelClass: [status + '-snack'],
    });
  }
}
