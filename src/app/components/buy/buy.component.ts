import { Component, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Price } from 'src/app/models/price.model';
import { ClientTradesService } from 'src/app/services/client-trades.service';
import { Trade } from 'src/app/models/trade';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { Portfolio } from 'src/app/models/portfolio.model';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Order } from 'src/app/models/order';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent {

  errorMessage: string = '';

  constructor(
    private snackBar: MatSnackBar,
    private clientTradesService: ClientTradesService,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<BuyComponent>,
    private clientService: ClientService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) { }

  order: Order = new Order("", this.data.price.instrument.minQuantity, this.data.price.bidPrice, "", "", "", "");
  cashValue = this.data.price.bidPrice;

  buy() {
    console.log('Price inside buy', this.data.price);
    this.order.instrumentId = this.data.price.instrument.instrumentId;
    this.order.direction = "B";

    this.clientTradesService.executeTrade(this.order).subscribe({
      next: (response: any) => {
        console.log(response);
        this.errorMessage = '';

          this.dialogRef.close({data: 'Refresh'});
          this.openSnackBar('Buy was successful!', 'ok');
        },
        error:(error: HttpErrorResponse) => {
          console.error( error + "**************Inside Buy Component");
          if(error.status == 406) {
            this.errorMessage = error.error;
            if(this.errorMessage=="Token expired, please login again"){
              console.log("Token Expired");
               this.clientService.deleteTokenInCookie();
               this.dialogRef.close({data: 'Refresh'});
               this.router.navigate(['login']);
            }
          }
          else if(error.status == 400){
            this.errorMessage = error.error;
          }
          else {
          this.errorMessage = error.statusText;
        }
        this.openSnackBar(this.errorMessage, 'error')
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
