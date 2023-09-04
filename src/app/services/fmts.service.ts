import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Portfolio } from '../models/portfolio.model';
import { Instrument } from '../models/instrument.model';

@Injectable({
  providedIn: 'root'
})
export class FmtsService {
 public fmtsUrl='http://localhost:3000/fmts/trades';
 mockStocks = [
  new Instrument('ABCD123', '', 'EXT123', 'Stock', 100, 1),
  new Instrument('EFGH456', '', 'EXT234', 'Stock', 200, 1)
];

  constructor(private http: HttpClient) { }
  
  getAllStocks(){
    return this.mockStocks;
  }

  getPriceData(): Observable<Portfolio[]>{
    return this.http.get<Portfolio[]>(this.fmtsUrl+'/prices');
  }

  getGovtPrice():Observable<Portfolio[]>{
    return this.http.get<Portfolio[]>(this.fmtsUrl+'/prices/GOVT')
  }
  getAllInstruments():Observable<Portfolio[]>{
    return this.http.get<Portfolio[]>(this.fmtsUrl+'/instruments')
  }

  getStockInstrument():Observable<Portfolio[]>{
    return this.http.get<Portfolio[]>(this.fmtsUrl+'/instruments/STOCK')
  }
  

}
