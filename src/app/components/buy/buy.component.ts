import { Component, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Price } from 'src/app/models/price.model';
import { ClientTradesService } from 'src/app/services/client-trades.service';
import { Trade } from 'src/app/models/trade';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { Portfolio } from 'src/app/models/portfolio.model';

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
    private clientService: ClientService, 
    // private router: Router,
    @Inject(MAT_DIALOG_DATA) public price: Price
  ){ }
  trade: Trade = new Trade(0, 0, 'BUY', '', '', '', 0);
  portFolio: Portfolio = new Portfolio("","","",new Date(),"",0,0,0);
  buy() {
    let email = this.route.snapshot.paramMap.get('email') || 'test@test.com';
    console.log(this.price);
    try{
      let id = this.price.instrument.externalId;
      this.trade.instrumentId = id;
      let p = this.price.bidPrice;
      this.trade.executionPrice = p;
      this.portFolio.externalId = id;
      this.portFolio.externalType = this.price.instrument.externalIdType;
      this.portFolio.categoryId = this.price.instrument.categoryId;
      this.portFolio.priceTimestamp = this.price.priceTimestamp;
      this.portFolio.instrumentDescription = this.price.instrument.instrumentDescription;
      this.portFolio.askPrice = this.price.askPrice;
      this.portFolio.bidPrice = this.price.bidPrice;
      this.clientService.recordPortFolioData(email,this.portFolio);
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
