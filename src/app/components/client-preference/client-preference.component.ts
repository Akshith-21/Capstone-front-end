import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  riskValue: string='';
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

  updateRiskValue() {
    // Update the riskValue in the service
    this.clientService.setRiskValue(this.riskValue);
  }

  setRiskTolerance(event:any){
    console.log(this.selectedRiskTolerance);  
  }
  
  setIncomeCategory(event:any){
    console.log(this.selectedIncomeCategory);
  }

  setLengthOfInvestment(event:any){
    console.log(this.lengthOfInvestmentOptions);
  }
  
  onSave(){
    console.log(this.email)
    this.router.navigate(['/home-page',this.email])
  }

  getRiskTolerance():string{
    console.log("get risk tolerance");
    console.log(this.selectedRiskTolerance.code)
    return this.selectedRiskTolerance.code;

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