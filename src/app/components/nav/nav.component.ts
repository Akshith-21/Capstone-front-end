import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientTradesService } from 'src/app/services/client-trades.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  @Input() page: string = '';
  constructor(private snackBar: MatSnackBar, private clientService:ClientService, private clientTradeService: ClientTradesService, private route:ActivatedRoute, private router:Router){;
  }


  onPreference(){
    this.router.navigate(['/preference'])
  }

  
  currentUrl: any;
  ngOnInit(){
    this.route.url.subscribe((url)=>{
      this.page = url[0].path;
    });

    if(this.clientService.authCreds?.clientId == undefined) {
      console.log(this.clientService.authCreds?.clientId);
      this.openSnackBar("Please Login First!", "error");
    }


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

  // isLandingPage= this.clientService.isLanding;
  // isPortFolio = this.clientService.isPortFolio

}
