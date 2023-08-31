import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FmtsService {
  private apiUrl='http://localhost:3000/fmts/trades'

  constructor() { }
}
