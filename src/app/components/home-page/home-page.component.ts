import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Portfolio } from 'src/app/models/portfolio.model';
import { FmtsService } from 'src/app/services/fmts.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  email: any;
  demo:Portfolio[]=[];

  constructor(private route: ActivatedRoute, private fmts:FmtsService) {}

  ngOnInit() {
    this.email = this.route.snapshot.paramMap.get('email');
    console.log("home", this.email)
    this.getPriceData();
    this.getAllInstruments();
    this.getGovtPrice();
    this.getStockInstrument();
  }

  getPriceData(){
    this.fmts.getPriceData().subscribe({next: (val:any) => {
      console.log(val)
      this.demo = val;
      console.log("fmts Price Data", this.demo)
    },}); 
   
  }
  getGovtPrice(){
    this.fmts.getGovtPrice().subscribe({next: (val:any) => {
      console.log(val)
      this.demo = val;
      console.log("fmts Govt Price Data", this.demo)
    },}); 
   
  }
  getAllInstruments(){
    this.fmts.getAllInstruments().subscribe({next: (val:any) => {
      console.log(val)
      this.demo = val;
      console.log("fmts Instrument Data", this.demo)
    },}); 
   
  }
  getStockInstrument(){
    this.fmts.getStockInstrument().subscribe({next: (val:any) => {
      console.log(val)
      this.demo = val;
      console.log("fmts Stock Instrument Data", this.demo)
    },}); 
   
  }




}
