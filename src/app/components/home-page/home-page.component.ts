import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientCredentials } from 'src/app/models/ClientCredentials';
import { Portfolio } from 'src/app/models/portfolio.model';
import { ClientService } from 'src/app/services/client.service';
import { FmtsService } from 'src/app/services/fmts.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  authCreds: ClientCredentials | undefined;
  constructor(private clientService: ClientService, private fmts: FmtsService) {  }

  demo: Portfolio[] = [];


  ngOnInit() {
    this.authCreds = this.clientService.getCreds();
    console.log("cred", this.authCreds);
    // this.getPriceData();
    // this.getAllInstruments();
    // this.getGovtPrice();
    // this.getStockInstrument();
  }

  // getPriceData(){
  //   this.fmts.getPriceData().subscribe({next: (val:any) => {
  //     console.log(val)
  //     this.demo = val;
  //     console.log("fmts Price Data", this.demo)
  //   },}); 

  // }
  // getGovtPrice(){
  //   this.fmts.getGovtPrice().subscribe({next: (val:any) => {
  //     console.log(val)
  //     this.demo = val;
  //     console.log("fmts Govt Price Data", this.demo)
  //   },}); 

  // }
  // getAllInstruments(){
  //   this.fmts.getAllInstruments().subscribe({next: (val:any) => {
  //     console.log(val)
  //     this.demo = val;
  //     console.log("fmts Instrument Data", this.demo)
  //   },}); 

  // }
  // getStockInstrument(){
  //   this.fmts.getStockInstrument().subscribe({next: (val:any) => {
  //     console.log(val)
  //     this.demo = val;
  //     console.log("fmts Stock Instrument Data", this.demo)
  //   },}); 
  //  
  // }




}
