import { Injectable } from '@angular/core';
import { Instrument } from '../models/instrument.model';

@Injectable({
  providedIn: 'root'
})
export class ClientTradesService {
  constructor() { }

  mockPortfolioData = new Map([
    ["test@test.com", [new Instrument('ABCD123', '','', 'EXT123', 'Stock', 100, 1)]]
  ]);
  mockTradeHistoryData = new Map([
    ["test@test.com", [{tradeType: 'buy', instrument: new Instrument('ABCD123', '','', 'EXT123', 'Stock', 100, 1), quantity: 2, time: 'Timestamp here'}]]
  ])

  getPortfolioData(email: string) {
    return this.mockPortfolioData.get(email);
  }

  geTradeHistoryData(email: string) {
    return this.mockTradeHistoryData.get(email);
  }

}
