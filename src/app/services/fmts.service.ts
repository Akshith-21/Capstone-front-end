import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Portfolio } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class FmtsService {
 public fmtsUrl='http://localhost:3000/fmts/trades'

  constructor(private http: HttpClient) { }
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
