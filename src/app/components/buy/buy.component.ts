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
    // private router: Router,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) { }

  // trade: Trade = new Trade(0, 0, 'BUY', '', '', '', 0);
  // portFolio: Portfolio = new Portfolio("","","",new Date(),"",0,0,0);
  order: Order = new Order("", this.data.price.instrument.minQuantity, this.data.price.bidPrice, "", "", "", "");
  // price:Price | undefined
  cashValue = this.data.price.bidPrice;

  buy() {
    // let email = this.route.snapshot.paramMap.get('email');
    // email = email?email:"Null";
    console.log('Price inside buy', this.data.price);
    // try{
      // let id = this.data.price.instrument.externalId;
      this.order.instrumentId = this.data.price.instrument.instrumentId;
      this.order.direction = "B";

      // let p = this.data.price.bidPrice;
      // this.trade.executionPrice = p;
      // this.portFolio.externalId = id;
      // this.portFolio.externalType = this.data.price.instrument.externalIdType;
      // this.portFolio.categoryId = this.data.price.instrument.categoryId;
      // this.portFolio.priceTimestamp = this.data.price.priceTimestamp;
      // this.portFolio.instrumentDescription = this.data.price.instrument.instrumentDescription;
      // this.portFolio.askPrice = this.data.price.askPrice;
      // this.portFolio.bidPrice = this.data.price.bidPrice;

      this.clientTradesService.executeTrade(this.order).subscribe({
        next: (response:any) => {
          console.log(response);
          this.errorMessage = '';

          this.dialogRef.close({data: 'Refresh'});
          const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
          const verticalPosition:MatSnackBarVerticalPosition ='top';
          this.snackBar.open('Buy was successful!', 'Close', {
            duration: 5000,
            horizontalPosition,
            verticalPosition,
            panelClass: ['custom-snackbar'], // Apply custom style
          });
        },
        error:(error: HttpErrorResponse) => {
          console.error( error + "**************Inside Buy Component");
          if(error.status == 406) {
            this.errorMessage = error.error;
            if(this.errorMessage=="token expired please login again"){
              console.log("Token Expired");
               this.clientService.deleteTokenInCookie();
               this.router.navigate(['login']);

            }
          }
          else if(error.status == 400){
            this.errorMessage = error.error;
          }
          else {
          this.errorMessage = error.statusText;
          }
        }
      });


  //     this.errorMessage = '';
  //     console.log('Balance inside buy', this.clientTradesService.mockBalanceData.get(this.data.email));
  //     // this.router.navigateByUrl('/trade/'+email)
  //     this.dialogRef.close({data: 'Refresh'});
  //     const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  //     const verticalPosition:MatSnackBarVerticalPosition ='top';
  //     this.snackBar.open('Buy was successful!', 'Close', {
  //       duration: 5000,
  //       horizontalPosition,
  //       verticalPosition,
  //       panelClass: ['custom-snackbar'], // Apply custom style
  //     });
  
      
  //   }
  //   catch(e) {
  //     this.errorMessage = 'Insufficient Balance';
      
  //   }
  }

}
