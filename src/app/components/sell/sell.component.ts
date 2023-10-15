import { Component } from '@angular/core';
import {EventEmitter, Output } from '@angular/core';
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
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent {
  errorMessage: string = '';
  constructor(
    private snackBar: MatSnackBar,
    private clientTradesService: ClientTradesService, 
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<SellComponent>,
    private clientService: ClientService, 
    // private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){ }
  // trade: Trade = new Trade(0, 0, 'SELL', '', '', '', 0);
  order: Order = new Order("", this.data.instrument.minQuantity, this.data.portfolio.askPrice, "", "", "", "");
  isprofit: boolean = false;
  profitamt = 0;
  cashValue: number = 0;
  portFolio: Portfolio = new Portfolio("","","",new Date(),"",0,0,0,"",0);
  sell() {
    console.log('Portfolio inside sell', this.data.portfolio);
    this.order.instrumentId = this.data.portfolio.instrumentId;
    this.order.direction = "S";

    this.clientTradesService.executeTrade(this.order).subscribe({
      next: (response) => {
        console.log(response);
        this.errorMessage = '';

        this.dialogRef.close({data: 'Refresh'});
        const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
        const verticalPosition:MatSnackBarVerticalPosition ='top';
        this.snackBar.open('Sell was successful!', 'Close', {
          duration: 5000,
          horizontalPosition,
          verticalPosition,
          panelClass: ['custom-snackbar'], // Apply custom style
        });
      },
      error:(error: HttpErrorResponse) => {
        console.log(error);
        if(error.status == 406) {
          this.errorMessage = 'Not Authorized!';
        }
        else {
        this.errorMessage = error.error;
        }
      }
    });
  }

  isProfit(portfolio:Portfolio):boolean{
    return this.clientService.isProfit(portfolio)
  }

  calculateProfitLossPercentage(portfolio:Portfolio):string {
    return this.clientService.calculateProfitLossPercentage(portfolio);
  }
  calculateAmount(){
    this.profitamt = this.order.quantity*(this.data.portfolio.askPrice - this.data.portfolio.bidPrice);
  }

}
