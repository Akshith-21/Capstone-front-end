import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Balance } from 'src/app/models/balance';
import { Portfolio } from 'src/app/models/portfolio.model';
import { Trade } from 'src/app/models/trade';
import { ClientTradesService } from 'src/app/services/client-trades.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-trade-history',
  templateUrl: './trade-history.component.html',
  styleUrls: ['./trade-history.component.css']
})
export class TradeHistoryComponent {
  direction = '';
  constructor(private clientTradesService: ClientTradesService, private route: ActivatedRoute,
    private clientService:ClientService) {}
  public trades: Trade[] | undefined = [];
  public email: string | undefined = '';
  balance : number = 0;
  clientId: string | undefined = '';

  fetchBalance() {
    this.clientTradesService.getBalance().subscribe({
      next: (response:Balance) => {
        console.log(response.balance,"Response balance:");
        this.balance = response.balance;
      },
      error:(error:any) =>{
          if(error.status===400)
          {
            console.log(error.error);
          }
      }
    });
  }

  fetchAllTrades() {
    this.clientTradesService.geTradeHistoryData().subscribe(data => this.trades = data);
    console.log(this.trades);
  }

  ngOnInit() {
    this.clientService.retrieveJsonPayLoadFromJwt();
    this.clientTradesService.setCreds(this.clientService.getCred());
    this.fetchAllTrades();
    this.fetchBalance();
    this.clientId = this.clientService.getCred()?.clientId;
  }



  }


