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
    @Inject(MAT_DIALOG_DATA) public price?: Price
  ) { }
  trade: Trade = new Trade(0, 0, 'BUY', '', '', '', 0);
  buy() {
    let email = this.route.snapshot.paramMap.get('email') || 'test@test.com';
    console.log(this.price);
    try{
      let id = this.price?.instrument.externalId;
      this.trade.instrumentId = id?id:'';
      let p = this.price?.bidPrice;
      this.trade.executionPrice = p?p:0;
      this.clientTradesService.recordTrade(email, this.trade);
      this.errorMessage = '';
      console.log(this.clientTradesService.mockBalanceData.get(email));
      // this.router.navigateByUrl('/trade/'+email)
      this.dialogRef.close({data: 'Refresh'});
      
    }
    catch(e) {
      this.errorMessage = 'Insufficient Balance';
      
    }
  }

}
