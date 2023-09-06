import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trade } from 'src/app/models/trade';
import { ClientTradesService } from 'src/app/services/client-trades.service';

@Component({
  selector: 'app-trade-history',
  templateUrl: './trade-history.component.html',
  styleUrls: ['./trade-history.component.css']
})
export class TradeHistoryComponent {
  constructor(private clientTradesService: ClientTradesService, private route: ActivatedRoute) {}
  public trades: Trade[] | undefined = [];
  public email: string | undefined = '';
  fetchAllTrades(email: string) {
    this.clientTradesService.geTradeHistoryData(email).subscribe(data => this.trades = data);
    console.log(this.trades);
  }

  ngOnInit() {
    let e = this.route.snapshot.paramMap.get('email');
    console.log('inside trade history ' + e);
    this.email = e?e:'test@test.com';
    this.fetchAllTrades(this.email);
  }
}
