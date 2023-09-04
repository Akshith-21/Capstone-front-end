import { Injectable } from '@angular/core';
import { Instrument } from '../models/instrument.model';
import { Trade } from '../models/trade';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientTradesService {
  constructor() { }

  mockPortfolioData = new Map([
    ["test@test.com", [new Instrument('ABCD123', '', 'EXT123', 'Stock', 100, 1)]]
  ]);
  mockTradeHistoryData: Map<string, Trade[]> = new Map<string, Trade[]>([
    ["test@test.com", [
      new Trade(1000, 10, 'buy', 'ABCD123', 'test', '01', 100), 
      new Trade(120, 10, 'buy', 'EFGH4567', 'test', '02', 12)
    ]]
  ])

  getPortfolioData(email: string) {
    return this.mockPortfolioData.get(email);
  }

  geTradeHistoryData(email: string): Observable<Trade[] | undefined> {
    return of(this.mockTradeHistoryData.get(email));
  }

}
