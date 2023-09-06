import { Injectable } from '@angular/core';
import { Instrument } from '../models/instrument.model';
import { Trade } from '../models/trade';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientTradesService {
  constructor() { }

  mockPortfolioData = new Map<string, Instrument[]>([
    ["test@test.com", [{
      instrumentId : "C100",
      externalIdType : "CUSIP",
      externalId : "48123Y5A0",
      categoryId : "CD",
      instrumentDescription : "JPMorgan Chase Bank, National Association 01/19",
      maxQuantity : 1000,
      minQuantity : 100
      }]]
  ]);
  mockTradeHistoryData: Map<string, Trade[]> = new Map<string, Trade[]>([
    ["test@test.com", [
      new Trade(1000, 10, 'buy', 'ABCD123', 'test', '01', 100), 
      new Trade(120, 10, 'buy', 'EFGH4567', 'test', '02', 12)
    ]]
  ]);

  mockBalanceData: Map<string, number> = new Map<string, number>([
    ["test@test.com", 1000000]
  ])

  getPortfolioData(email: string) {
    return this.mockPortfolioData.get(email);
  }

  geTradeHistoryData(email: string): Observable<Trade[] | undefined> {
    return of(this.mockTradeHistoryData.get(email));
  }

  recordTrade(email:string, trade: Trade) {
    let balance = this.mockBalanceData.get(email);
    balance = balance ? balance : 0;
    if(trade.direction == 'BUY'){
    if(trade.cashValue <= balance) {
      this.mockBalanceData.set(email, balance-trade.cashValue);
      this.mockTradeHistoryData.get(email)?.push(trade);
    }
    else {
      throw(new Error('Insufficient balance'));
  }
}

else{
 
    this.mockBalanceData.set(email, balance+trade.cashValue);
    this.mockTradeHistoryData.get(email)?.push(trade);
}
}


  }

  



