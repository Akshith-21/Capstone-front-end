import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientTradesService } from 'src/app/services/client-trades.service';

@Component({
  selector: 'app-trade-history',
  templateUrl: './trade-history.component.html',
  styleUrls: ['./trade-history.component.css']
})
export class TradeHistoryComponent {
  constructor(private clientTradesService: ClientTradesService, private route: ActivatedRoute) {}
  public trades: any;
  fetchAllTrades(email: string) {
    this.trades = this.clientTradesService.geTradeHistoryData(email);
    console.log(this.trades);
  }

  ngOnInit() {
    let email = this.route.snapshot.paramMap.get('email');
    this.fetchAllTrades(email?email:'test@test.com');
  }
}
