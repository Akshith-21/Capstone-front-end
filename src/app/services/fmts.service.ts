import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Portfolio } from '../models/portfolio.model';
import { Instrument } from '../models/instrument.model';
import { Price } from '../models/price.model';

@Injectable({
  providedIn: 'root'
})
export class FmtsService {
 public fmtsUrl='http://localhost:3000/fmts/trades';
 mockPrices : Price[] = [];
  

  constructor(private http: HttpClient) { }
  
  getAllPrices(): Observable<Price[]>{
    // return of(this.mockPrices);
    return this.http.get<Price[]>(this.fmtsUrl+'/prices');
  }

  // getPriceData(): Observable<Portfolio[]>{
  //   return this.http.get<Portfolio[]>(this.fmtsUrl+'/prices');
  // }

  // getGovtPrice():Observable<Portfolio[]>{
  //   return this.http.get<Portfolio[]>(this.fmtsUrl+'/prices/GOVT')
  // }
  // getAllInstruments():Observable<Portfolio[]>{
  //   return this.http.get<Portfolio[]>(this.fmtsUrl+'/instruments')
  // }

  // getStockInstrument():Observable<Portfolio[]>{
  //   return this.http.get<Portfolio[]>(this.fmtsUrl+'/instruments/STOCK')
  // }
  

}
