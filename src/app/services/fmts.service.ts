import { Injectable } from '@angular/core';
import { Instrument } from '../models/instrument.model';

@Injectable({
  providedIn: 'root'
})
export class FmtsService {
  constructor() { }
  private apiUrl='http://localhost:3000/fmts/trades'
  mockStocks = [
    new Instrument('ABCD123', '', 'EXT123', 'Stock', 100, 1),
    new Instrument('EFGH456', '', 'EXT234', 'Stock', 200, 1)
  ];

  getAllStocks(){
    return this.mockStocks;
  }

}
