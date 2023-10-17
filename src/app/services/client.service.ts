import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { Person } from '../models/person';
import { ClientIdentification } from '../models/clientIdentification';
import { ClientTradesService } from './client-trades.service';
import { Portfolio } from '../models/portfolio.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Instrument } from '../models/instrument.model';
import { Preferences } from '../models/preferences';
import { Price } from '../models/price.model';
import { Trade } from '../models/trade';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/loginRequest';
import { ClientCredentials } from '../models/ClientCredentials';
import { PreferencesRequest } from '../models/PreferencesRequest';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ClientService {
  private baseUrl ='http://localhost:5000';

  constructor(private clientTradesService: ClientTradesService,private router:Router, private http:HttpClient,private cookieService: CookieService) {}
  private riskValueSubject = ''; // Initial value

  isPortFolio: boolean = false
  isLanding: boolean = false
  authCreds:ClientCredentials = {
    clientId:'',
    token:''
  }

  public mockClientData = new Map([
    ["test@test.com", new Client(new Person('tests@test.com', "1", String(new Date('2001-01-01')), 'India', 'test'), new Set<ClientIdentification>([new ClientIdentification('test', 'test')]))],
    ["mehulrana@gmail.com", new Client(new Person('mehulrana@gmail.com', "2", String(new Date("2001-04-05")), 'India', '411006'), new Set<ClientIdentification>([new ClientIdentification('PAN', '12345')]))],
  ]);
  public clientPreferences: Record<string,Preferences> = {
    "testp@testp.com": new Preferences("","","",""),
  }
  // mockPortfolioData: Map<string, Portfolio[] | undefined> = new Map([
  //   ["test@test.com", [new Portfolio('Bond', 'GOOG', 'Technology', new Date(), 'Google Inc. bond',100,20,1),new Portfolio('Cryptocurrency', 'BTC', 'Currency', new Date(), 'Bitcoin Inc. bond',100,200,1)]],
  //   ["riti@gmail.com", [new Portfolio('Cryptocurrency', 'BTC', 'Currency', new Date(), 'Bitcoin',800,23,1)]],
  //   ["mehul@gmail.com", [new Portfolio('Auction', 'APPL', 'Stock', new Date(), 'Bitcoin',344,233,1)]],
  // ]);

  mockRoboAdvisorDataH:Price[] = [
    {
      "askPrice": 104.75,
      "bidPrice": 104.25,
      "priceTimestamp": "21-AUG-19 10.00.01.042000000 AM GMT",
      "instrument": {
      "instrumentId": "N123456",
      "externalIdType": "CUSIP",
      "externalId": "46625H100",
      "categoryId": "STOCK",
      "instrumentDescription": "JPMorgan Chase & Co. Capital Stock",
      "maxQuantity": 1000,
      "minQuantity": 1
      }
      },
      {
      "askPrice": 312500,
      "bidPrice": 312000,
      "priceTimestamp": "21-AUG-19 05.00.00.040000000 AM -05:00",
      "instrument": {
      "instrumentId": "N123789",
      "externalIdType": "ISIN",
      "externalId": "US0846707026",
      "categoryId": "STOCK",
      "instrumentDescription": "Berkshire Hathaway Inc. Class A",
      "maxQuantity": 10,
      "minQuantity": 1
      }
      },
      {
      "askPrice": 95.92,
      "bidPrice": 95.42,
      "priceTimestamp": "21-AUG-19 10.00.02.042000000 AM GMT",
      "instrument": {
      "instrumentId": "C100",
      "externalIdType": "CUSIP",
      "externalId": "48123Y5A0",
      "categoryId": "CD",
      "instrumentDescription": "JPMorgan Chase Bank, National Association 01/19",
      "maxQuantity": 1000,
      "minQuantity": 100
      }
      },
      {
      "askPrice": 1.03375,
      "bidPrice": 1.03390625,
      "priceTimestamp": "21-AUG-19 10.00.02.000000000 AM GMT",
      "instrument": {
      "instrumentId": "T67890",
      "externalIdType": "CUSIP",
      "externalId": "9128285M8",
      "categoryId": "GOVT",
      "instrumentDescription": "USA, Note 3.125 15nov2028 10Y",
      "maxQuantity": 10000,
      "minQuantity": 100
      }
      },
      {
      "askPrice": 0.998125,
      "bidPrice": 0.99828125,
      "priceTimestamp": "21-AUG-19 10.00.02.002000000 AM GMT",
      "instrument": {
      "instrumentId": "T67894",
      "externalIdType": "CUSIP",
      "externalId": "9128285Z9",
      "categoryId": "GOVT",
      "instrumentDescription": "USA, Note 2.5 31jan2024 5Y",
      "maxQuantity": 10000,
      "minQuantity": 100
      }
      }
  ]
  mockRoboAdvisorDataM:Price[] = [
    {
      "askPrice": 1.03375,
      "bidPrice": 1.03390625,
      "priceTimestamp": "21-AUG-19 10.00.02.000000000 AM GMT",
      "instrument": {
      "instrumentId": "T67890",
      "externalIdType": "CUSIP",
      "externalId": "9128285M8",
      "categoryId": "GOVT",
      "instrumentDescription": "USA, Note 3.125 15nov2028 10Y",
      "maxQuantity": 10000,
      "minQuantity": 100
      }
      },
   
      {
      "askPrice": 312500,
      "bidPrice": 312000,
      "priceTimestamp": "21-AUG-19 05.00.00.040000000 AM -05:00",
      "instrument": {
      "instrumentId": "N123789",
      "externalIdType": "ISIN",
      "externalId": "US0846707026",
      "categoryId": "STOCK",
      "instrumentDescription": "Berkshire Hathaway Inc. Class A",
      "maxQuantity": 10,
      "minQuantity": 1
      }
      },
      {
        "askPrice": 104.75,
        "bidPrice": 104.25,
        "priceTimestamp": "21-AUG-19 10.00.01.042000000 AM GMT",
        "instrument": {
        "instrumentId": "N123456",
        "externalIdType": "CUSIP",
        "externalId": "46625H100",
        "categoryId": "STOCK",
        "instrumentDescription": "JPMorgan Chase & Co. Capital Stock",
        "maxQuantity": 1000,
        "minQuantity": 1
        }
        },
      {
      "askPrice": 95.92,
      "bidPrice": 95.42,
      "priceTimestamp": "21-AUG-19 10.00.02.042000000 AM GMT",
      "instrument": {
      "instrumentId": "C100",
      "externalIdType": "CUSIP",
      "externalId": "48123Y5A0",
      "categoryId": "CD",
      "instrumentDescription": "JPMorgan Chase Bank, National Association 01/19",
      "maxQuantity": 1000,
      "minQuantity": 100
      }
      },
   
      {
      "askPrice": 0.998125,
      "bidPrice": 0.99828125,
      "priceTimestamp": "21-AUG-19 10.00.02.002000000 AM GMT",
      "instrument": {
      "instrumentId": "T67894",
      "externalIdType": "CUSIP",
      "externalId": "9128285Z9",
      "categoryId": "GOVT",
      "instrumentDescription": "USA, Note 2.5 31jan2024 5Y",
      "maxQuantity": 10000,
      "minQuantity": 100
      }
      }
  ]
  mockRoboAdvisorDataL:Price[] = [{
    "askPrice": 104.75,
    "bidPrice": 104.25,
    "priceTimestamp": "21-AUG-19 10.00.01.042000000 AM GMT",
    "instrument": {
    "instrumentId": "N123456",
    "externalIdType": "CUSIP",
    "externalId": "46625H100",
    "categoryId": "STOCK",
    "instrumentDescription": "JPMorgan Chase & Co. Capital Stock",
    "maxQuantity": 1000,
    "minQuantity": 1
    }
    },
    {
    "askPrice": 312500,
    "bidPrice": 312000,
    "priceTimestamp": "21-AUG-19 05.00.00.040000000 AM -05:00",
    "instrument": {
    "instrumentId": "N123789",
    "externalIdType": "ISIN",
    "externalId": "US0846707026",
    "categoryId": "STOCK",
    "instrumentDescription": "Berkshire Hathaway Inc. Class A",
    "maxQuantity": 10,
    "minQuantity": 1
  }}, 
]










  checkUniqueIdentification(idn: string, idnset: Set<ClientIdentification>): boolean {
    for (let clientIdentification of idnset) {
      if (idn === clientIdentification.value) {
        return true;
      }
    }
    return false;
  }
  verifyEmailAndIdentification(email: string, idn: string): boolean {
    for (let personEmail of this.mockClientData.entries()) {
      if (email === personEmail[0] || this.checkUniqueIdentification(idn, personEmail[1].clientIdentificationSet)) {
        return true;
        break;
      }
    }
    return false;
  }





  verifyEmail(email: string): boolean {
    for (let personEmail of this.mockClientData.entries()) {
      if (email === personEmail[0]) {
        return true;
        break;
      }
    }
    return false;
  }

   addClient(clientData:any) : Observable<ClientCredentials>{
    console.log("In serv", clientData);
      return this.http.post<ClientCredentials>(`${this.baseUrl}/register`, clientData)
   }

   loginClient( loginRequest:LoginRequest):Observable<ClientCredentials>{
   
      console.log("email+ pswd", loginRequest.email, loginRequest.pswd);
      return this.http.post<ClientCredentials>(`${this.baseUrl}/login/`, loginRequest)
   }

   setPreferences(preferencesRequest:PreferencesRequest, clientId:string):Observable<String>{
    console.log("preferences received are: "+ preferencesRequest);
    return this.http.post<String>(`${this.baseUrl}/preferences/setPreferences?clientId=`+clientId, preferencesRequest);
   }
   storeTokenInCookie(token:string){
      this.cookieService.set('jwtToken',token);
   }
   retrieveJsonPayLoadFromJwt() {
    const token = this.cookieService.get('jwtToken');
    console.log('token is : ' + token);
    if(token){
      this.authCreds = jwt_decode.default(token);
    }
    else{
      this.router.navigate(['login']);
    }

   }
   deleteTokenInCookie() {
    const token = this.cookieService.get('jwtToken')
    if(token){
    this.cookieService.delete('jwtToken');
    }
    
  }
   setCreds(token:string){
        this.storeTokenInCookie(token);
        this.retrieveJsonPayLoadFromJwt();
   }

   getCred():ClientCredentials{
    return this.authCreds;
   }

   



  getRoboAdvisorData(type:string): Observable<Price[] | undefined> {
     if(type==='Low')
      return of(this.mockRoboAdvisorDataL)
    else if(type==='Medium')
      return of(this.mockRoboAdvisorDataM)
    else
    return of(this.mockRoboAdvisorDataH)
  }

  // setRisk(risk: string) {
  //   this.riskValue = risk;
  // }


  setRiskValue(value: string) {
    this.riskValueSubject=value;
    console.log(this.riskValueSubject+"kdlkf")
  }
  // getRisk(): string {
  //   console.log("get" , this.riskValue)

  //   return this.riskValue;
  // }

  getRiskValue(): Observable<string> {
    return of(this.riskValueSubject);
  }

  // recordPortFolioData(email:string,portfolio:Portfolio){
  //   let mockportfolio = this.mockPortfolioData.get(email);
  //     mockportfolio = mockportfolio?mockportfolio:[];
  //     let index = 0;
  //     for(let portfolio1 of mockportfolio){
  //       if(portfolio1.instrumentDescription === portfolio.instrumentDescription){ 
  //         portfolio1.currentHoldings = portfolio1.currentHoldings + portfolio.currentHoldings;
  //         return;
  //       }
  //     }
  //   this.mockPortfolioData.get(email)?.push(portfolio);
  // }
  // recordSellTradePortfolio(email:string,portfolio:Portfolio,trade:Trade){
  //   if(portfolio.currentHoldings < trade.quantity){
  //     throw(new Error("Quantity provided is greater than the current holding"))
  //   }
  //   else if(portfolio.currentHoldings - trade.quantity > 0){
  //     let mockportfolio = this.mockPortfolioData.get(email);
  //     mockportfolio = mockportfolio?mockportfolio:[];
  //     for(let portfolio1 of mockportfolio){
  //       if(portfolio1.instrumentDescription === portfolio.instrumentDescription){
  //         portfolio1.currentHoldings = portfolio.currentHoldings - trade.quantity;
          
  //         break;
  //       }
  //     }
  //   }
  //   else if(portfolio.currentHoldings - trade.quantity == 0){
     
  //     let mockportfolio = this.mockPortfolioData.get(email);
  //     console.log("before" + mockportfolio)
  //     mockportfolio = mockportfolio?mockportfolio:[];
  //     mockportfolio.splice(mockportfolio.indexOf(portfolio), 1)
  //     console.log(mockportfolio);
  //     this.mockPortfolioData.set(email,mockportfolio);
 
  //   }
  // }

  isProfit(portfolios:Portfolio): boolean {
    return portfolios.askPrice >= portfolios.bidPrice;
  }
  
  calculateProfitLossPercentage(portfolios:Portfolio): string {
    return ((portfolios.askPrice - portfolios.bidPrice) / portfolios.bidPrice * 100).toFixed(2);
  }
 

}


function deleteTokenInCookie() {
  throw new Error('Function not implemented.');
}
  // getTempObject() :{[email:string]: Client}{
  // const temp :{[email :string] : Client} ={};
  // this.mockClientData.forEach((email,client)=>{
  //   const id = client.clientIdentificationSet.value().next.value();



  // })
  // return temp;
  // }
  // uniqueStruct = new Map<string , Client>(); //Unique structure w}