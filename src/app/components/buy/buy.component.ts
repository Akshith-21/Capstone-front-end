import { Component, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Price } from 'src/app/models/price.model';
import { ClientTradesService } from 'src/app/services/client-trades.service';
import { Trade } from 'src/app/models/trade';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent {

  errorMessage: string = '';

  constructor(
    private clientTradesService: ClientTradesService, 
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<BuyComponent>, 
    // private router: Router,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) { }
  trade: Trade = new Trade(0, 0, 'BUY', '', '', '', 0);
  buy() {
    // let email = this.route.snapshot.paramMap.get('email');
    // email = email?email:"Null";
    console.log('Price inside buy', this.data.price);
    console.log('Email inside buy', this.data.email)
    try{
      let id = this.data.price.instrument.externalId;
      this.trade.instrumentId = id?id:'';
      let p = this.data.price.bidPrice;
      this.trade.executionPrice = p?p:0;
      this.clientTradesService.recordTrade(this.data.email, this.trade);
      this.errorMessage = '';
      console.log('Balance inside buy', this.clientTradesService.mockBalanceData.get(this.data.email));
      // this.router.navigateByUrl('/trade/'+email)
      this.dialogRef.close({data: 'Refresh'});
      
    }
    catch(e) {
      this.errorMessage = 'Insufficient Balance';
      
    }
  }

}
