import { Injectable } from '@angular/core';
import { Instrument } from '../models/instrument.model';
import { Trade } from '../models/trade';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ClientCredentials } from '../models/ClientCredentials';
import { Balance } from '../models/balance';
import { Order } from '../models/order';
import { Portfolio } from '../models/portfolio.model';
import { v4 as uuid } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class ClientTradesService {
  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/trade';

  authCreds: ClientCredentials | undefined;



  mockPortfolioData = new Map<string, Instrument[]>([
    ["test@test.com", [{
      instrumentId: "C100",
      externalIdType: "CUSIP",
      externalId: "48123Y5A0",
      categoryId: "CD",
      instrumentDescription: "JPMorgan Chase Bank, National Association 01/19",
      maxQuantity: 1000,
      minQuantity: 100
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

  setCreds(response:ClientCredentials){
    this.authCreds = response;
  }

  getBalance(): Observable<Balance> {
    return this.http.get<Balance>(`${this.baseUrl}/balance/${this.authCreds?.clientId}`);
  }


  getPortfolioData(): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>(`${this.baseUrl}/portfolio/${this.authCreds?.clientId}`);
  }

  geTradeHistoryData(): Observable<Trade[]> {
    return this.http.get<Trade[]>(`${this.baseUrl}/history/${this.authCreds?.clientId}`);
  }

  executeTrade(order:Order) {
    let clientId = this.authCreds?.clientId;
    order.clientId = clientId ? clientId : "";

    let token = this.authCreds?.token;
    order.token = token ? token : "";


    order.orderId = "PQRE";//uuid();

    return this.http.post(`${this.baseUrl}/execute`, order);
  }

}



