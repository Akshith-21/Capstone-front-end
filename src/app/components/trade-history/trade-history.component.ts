import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  fetchAllTrades() {
    this.clientTradesService.geTradeHistoryData().subscribe(data => this.trades = data);
    console.log(this.trades);
  }

  ngOnInit() {
    this.fetchAllTrades();
  }



  }


