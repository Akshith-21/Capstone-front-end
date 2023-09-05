import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { Person } from '../models/person';
import { ClientIdentification } from '../models/clientIdentification';
import { ClientTradesService } from './client-trades.service';
import { Portfolio } from '../models/portfolio.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Instrument } from '../models/instrument.model';
import { Preferences } from '../models/preferences';

@Injectable({
  providedIn: 'root'
})





export class ClientService {
  constructor(private clientTradesService: ClientTradesService) {}
  private riskValueSubject = 'test'; // Initial value

  isPortFolio: boolean = false
  isLanding: boolean = false

  public mockClientData = new Map([
    ["test@test.com", new Client(new Person('tests@test.com', "1", String(new Date('2001-01-01')), 'India', 'test'), new Set<ClientIdentification>([new ClientIdentification('test', 'test')]))],
    ["mehulrana@gmail.com", new Client(new Person('mehulrana@gmail.com', "2", String(new Date("2001-04-05")), 'India', '411006'), new Set<ClientIdentification>([new ClientIdentification('PAN', '12345')]))],
  ]);
  public clientPreferences: Record<string,Preferences> = {
    "testp@testp.com": new Preferences("","","",""),
  }
  mockPortfolioData: Map<string, Portfolio[]> = new Map([
    ["test@test.com", [new Portfolio('Bond', 'GOOG', 'Technology', new Date(), 'Google Inc. bond',100,20),new Portfolio('Cryptocurrency', 'BTC', 'Currency', new Date(), 'Bitcoin Inc. bond',100,200)]],
    ["riti@gmail.com", [new Portfolio('Cryptocurrency', 'BTC', 'Currency', new Date(), 'Bitcoin',800,23)]],
    ["mehul@gmail.com", [new Portfolio('Auction', 'APPL', 'Stock', new Date(), 'Bitcoin',344,233)]],
  ]);

  mockRoboAdvisorDataH: Instrument[] = [{
    "instrumentId": "Q123",
    "externalIdType": "CUSIP",
    "externalId": "02079K107",
    "categoryId": "STOCK",
    "instrumentDescription": "Alphabet Inc. Class C Capital Stock",
    "maxQuantity": 1000,
    "minQuantity": 1
  },
  {
    "instrumentId": "Q456",
    "externalIdType": "CUSIP",
    "externalId": "88160R101",
    "categoryId": "STOCK",
    "instrumentDescription": "Tesla, Inc. Common Stock",
    "maxQuantity": 1000,
    "minQuantity": 1
  },
  {
    "instrumentId": "N123456",
    "externalIdType": "CUSIP",
    "externalId": "46625H100",
    "categoryId": "STOCK",
    "instrumentDescription": "JPMorgan Chase & Co. Capital Stock",
    "maxQuantity": 1000,
    "minQuantity": 1
  },
  {
    "instrumentId": "N123789",
    "externalIdType": "ISIN",
    "externalId": "US0846707026",
    "categoryId": "STOCK",
    "instrumentDescription": "Berkshire Hathaway Inc. Class A",
    "maxQuantity": 10,
    "minQuantity": 1
  },
  {
    "instrumentId": "C100",
    "externalIdType": "CUSIP",
    "externalId": "48123Y5A0",
    "categoryId": "CD",
    "instrumentDescription": "JPMorgan Chase Bank, National Association 01/19",
    "maxQuantity": 1000,
    "minQuantity": 100
  }];

  mockRoboAdvisorDataM: Instrument[] = [{
    "instrumentId": "N123456",
    "externalIdType": "CUSIP",
    "externalId": "46625H100",
    "categoryId": "STOCK",
    "instrumentDescription": "JPMorgan Chase & Co. Capital Stock",
    "maxQuantity": 1000,
    "minQuantity": 1
  },
  {
    "instrumentId": "N123789",
    "externalIdType": "ISIN",
    "externalId": "US0846707026",
    "categoryId": "STOCK",
    "instrumentDescription": "Berkshire Hathaway Inc. Class A",
    "maxQuantity": 10,
    "minQuantity": 1
  },]

  mockRoboAdvisorDataL: Instrument[] = [{
    "instrumentId": "N123456",
    "externalIdType": "CUSIP",
    "externalId": "46625H100",
    "categoryId": "STOCK",
    "instrumentDescription": "JPMorgan Chase & Co. Capital Stock",
    "maxQuantity": 1000,
    "minQuantity": 1
  },
  {
    "instrumentId": "N123789",
    "externalIdType": "ISIN",
    "externalId": "US0846707026",
    "categoryId": "STOCK",
    "instrumentDescription": "Berkshire Hathaway Inc. Class A",
    "maxQuantity": 10,
    "minQuantity": 1
  }, {
    "instrumentId": "N123789",
    "externalIdType": "ISIN",
    "externalId": "US0846707026",
    "categoryId": "STOCK",
    "instrumentDescription": "Berkshire Hathaway Inc. Class A",
    "maxQuantity": 10,
    "minQuantity": 1
  }]









  getPortfolioData(email: string): Observable<Portfolio[] | undefined> {
    return of(this.mockPortfolioData.get(email))
  }

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



  addClient(person: Person, clientIdentification: ClientIdentification) {
    this.mockClientData.set(person.email, new Client(person, new Set<ClientIdentification>([clientIdentification])));
    console.log(this.mockClientData);
    this.clientTradesService.mockBalanceData.set(person.email, 1000000)
    
  }
  generateUniqueId(userEmail: string): string {
    {
      const timestamp = Date.now().toString(36);
      const randomNum = Math.floor(Math.random() * 1000).toString(36);
      const userPart = userEmail.substring(0, 3).toUpperCase();
      const uniqueId = `${userPart}-${timestamp}-${randomNum}`;
      return uniqueId;
    }

  }


  doesEmailExist(email: string) {
    return this.mockClientData.has(email);
  }
  getId(email: string): Set<ClientIdentification> | undefined {
    const temp = this.mockClientData.get(email);
    return temp?.clientIdentificationSet
  }

  getRoboAdvisorData(type:string): Observable<Instrument[] | undefined> {
     if(type==='Low')
      return of(this.mockRoboAdvisorDataL)
    else if(type==='Medium')
      return of(this.mockRoboAdvisorDataM)
    else
    return of(this.mockRoboAdvisorDataH)
  }


  setRiskValue(value: string) {
    this.riskValueSubject=value;
  }

  getRiskValue(): Observable<string> {
    return of(this.riskValueSubject);
  }

  // getTempObject() :{[email:string]: Client}{
  // const temp :{[email :string] : Client} ={};
  // this.mockClientData.forEach((email,client)=>{
  //   const id = client.clientIdentificationSet.value().next.value();



  // })
  // return temp;
  // }
  // uniqueStruct = new Map<string , Client>(); //Unique structure which is combination of email id and identification value











}