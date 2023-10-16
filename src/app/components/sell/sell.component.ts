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
  order: Order = new Order("", 1, this.data.portfolio.askPrice, "", "", "", "");
  isprofit: boolean = false;
  profitamt:string = '';
  cashValue = this.data.portfolio.askPrice;

    ngOnInit() {
      this.calculateAmount(this.data.portfolio)
    }

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
        console.error( error + "**************Inside Buy Component");
        if(error.status == 406) {
          this.errorMessage = error.error;
        }
        else if(error.status == 400){
          this.errorMessage = error.error;
        }
        else {
        this.errorMessage = error.statusText;
        }
      }
    });
  }

  isProfit(portfolio:Portfolio):boolean{
    return parseFloat(this.calculateProfitLossPercentage(portfolio))>0;
  }

  calculateProfitLossPercentage(portfolios:Portfolio):string {
    let eachItemInvestment = portfolios.totalInvestment / portfolios.currentHoldings;
    let sellPrice = portfolios.askPrice;
   return (((sellPrice - eachItemInvestment)/eachItemInvestment)*100).toFixed(2);
  }
  calculateAmount(portfolios:Portfolio){
    let eachItemInvestment = portfolios.totalInvestment / portfolios.currentHoldings;
    let buyPrice = eachItemInvestment * this.order.quantity;
    let sellPrice = portfolios.askPrice * this.order.quantity;
    this.profitamt = ((sellPrice - buyPrice)).toFixed(2);
  }

}
