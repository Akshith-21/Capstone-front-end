import { Component, OnInit } from '@angular/core';
import {SelectItem } from 'primeng/api';

 

 

interface InvestmentInterface {
  name: string,
  code: string
}
@Component({
  selector: 'app-client-preference',
  templateUrl: './client-preference.component.html',
  styleUrls: ['./client-preference.component.css']
})

 

 

export class ClientPreferencesComponent implements OnInit{

  investmentPurpose:string = "";
  selectedLengthOfInvestment!:InvestmentInterface;
  selectedRiskTolerance!:InvestmentInterface;
  selectedIncomeCategory!:InvestmentInterface;
  lengthOfInvestmentOptions:InvestmentInterface[] = [];
  riskToleranceOptions:InvestmentInterface[] =[];
  incomeCategoryOptions:InvestmentInterface[] =[];

  setRiskTolerance(event:any){
    console.log(event);  
  }
  
  setIncomeCategory(event:any){
    console.log(event);
  }

  setLengthOfInvestment(event:any){
    console.log(event);
  }

  ngOnInit() {
    this.lengthOfInvestmentOptions =[
      {name:'0-1 years', code:'0-1 years'},
      {name:'1 years- 5 years', code:'1 years- 5 years'},
      {name:'more than 5 years', code:'more than 5 years'},
    ];

    this.riskToleranceOptions=[
      {name:'Low', code:'Low'},
      {name:'Medium', code:'Medium'},
      {name:'High', code:'High'},
    ]

    this.incomeCategoryOptions = [
      {name:'0-100000', code:'0-100000'},
      {name:'100000-200000', code:'100000-200000'},
      {name:'more than 20000', code:'more than 20000'},
    ]

  }
}