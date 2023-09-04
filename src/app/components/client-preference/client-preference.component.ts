import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {SelectItem } from 'primeng/api';
import { ClientService } from 'src/app/services/client.service';

 

 

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

  @Input() email: any;
  constructor(private clientService:ClientService,private  route:ActivatedRoute, private router:Router){
    this.route.params.subscribe(params => {
    this.email = params['email'];
      console.log("const", this.email)
    })
  }

  investmentPurpose:string = "";
  selectedRiskTolerance!:InvestmentInterface;
  selectedIncomeCategory!:InvestmentInterface;
  selectedLengthOfInvestment!:InvestmentInterface;
  
  lengthOfInvestmentOptions:InvestmentInterface[] = [];
  riskToleranceOptions:InvestmentInterface[] =[];
  incomeCategoryOptions:InvestmentInterface[] =[];

  setInvestmentPurpose(event:any){
    console.log(this.investmentPurpose)
  }

  setRiskTolerance(event:any){
    console.log(this.selectedRiskTolerance);  
  }
  
  setIncomeCategory(event:any){
    console.log(this.selectedIncomeCategory);
  }

  setLengthOfInvestment(event:any){
    console.log(this.selectedLengthOfInvestment);
  }
  
  onSave(){
    console.log(this.email)
    console.log(this.investmentPurpose)
    console.log(this.selectedRiskTolerance)
    console.log(this.selectedLengthOfInvestment)
    console.log(this.selectedIncomeCategory)
    this.router.navigate(['/home-page',this.email])
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